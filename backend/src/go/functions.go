package swagger

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

func getBudgetFunc(w http.ResponseWriter, r *http.Request) {
	year := r.FormValue("year")
	month := r.FormValue("month")
	db := connectDB()
	defer db.Close()

	rows, err := db.Query(fmt.Sprintf(`SELECT 
 		  ma.account_jp
		  ,db.ammount
		 FROM bi_data_budget db
		INNER JOIN master_account ma
        ON ma.account_en = db.account WHERE year = %s AND month = %s`, year, month))
	if err != nil {
		log.Printf("Failed select buget from bi_data_budget: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var budgetSlice []Budget
	for rows.Next() {
		var budget Budget
		err := rows.Scan(&budget.Account, &budget.Amount)
		if err != nil {
			log.Printf("Failed to convert to budget structure: %v", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		budgetSlice = append(budgetSlice, budget)
	}

	bugetJson, err := json.Marshal(&budgetSlice)
	if err != nil {
		log.Printf("Failed to convert to budgetJson: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(bugetJson)

}

func getPerformanceFunc(w http.ResponseWriter, r *http.Request) {
	year := r.FormValue("year")
	month := r.FormValue("month")
	db := connectDB()
	defer db.Close()

	rows, err := db.Query(fmt.Sprintf(
		`SELECT 
 		  ma.account_jp
		  ,ds.ammount
 		  ,db.ammount - ds.ammount as balance
		 FROM  bi_data_storage ds 
		 INNER JOIN bi_data_budget db
  		 ON ds.year = db.year 
 		  AND ds.month = db.month
 		  AND ds.account = db.account
		INNER JOIN master_account ma
        ON ma.account_en = ds.account
   		WHERE ds.year = %s
 		 AND ds.month = %s;`, year, month))
	if err != nil {
		log.Printf("Failed select performance from bi_data_storage:%v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var performanceSlice []Performance
	for rows.Next() {
		var performance Performance
		err := rows.Scan(&performance.Account, &performance.Amount, &performance.Balance)
		if err != nil {
			log.Printf("Failed to convert to performance structure:%v", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		performanceSlice = append(performanceSlice, performance)
	}

	performanceJson, err := json.Marshal(&performanceSlice)
	if err != nil {
		log.Printf("Failed to convert to budgetJson: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(performanceJson)

}

func getAggregationFunc(w http.ResponseWriter, r *http.Request) {
	year := r.FormValue("year")
	month := r.FormValue("month")
	db := connectDB()
	defer db.Close()

	rows, err := db.Query(fmt.Sprintf(
		`SELECT
	 		SUM(bdb.ammount) budget
			,IFNULL(SUM(bds.ammount), 0) consum
			,IFNULL(SUM(bdb.ammount - bds.ammount), 0) balance
		FROM bi_data_budget bdb
		LEFT JOIN bi_data_storage bds
		ON bdb.year = bds.year
			AND bdb.month = bds.month
			AND bdb.account = bds.account
		WHERE bdb.year = '%s'
			AND bdb.month = '%s'
		GROUP BY bdb.year, bdb.month;`, year, month))
	if err != nil {
		log.Printf("Failed select aggregation from bi_data_storage:%v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var aggregation Aggregation
	for rows.Next() {
		err := rows.Scan(&aggregation.Budget, &aggregation.Consum, &aggregation.Balance)
		if err != nil {
			log.Printf("Failed to convert to aggregation structure:%v", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	aggregationJson, err := json.Marshal(&aggregation)
	if err != nil {
		log.Printf("Failed to convert to budgetJson: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(aggregationJson)

}

func getAccountMasterFunc(w http.ResponseWriter, r *http.Request) {
	db := connectDB()
	defer db.Close()

	rows, err := db.Query(fmt.Sprintf(`SELECT account_en, account_jp FROM bi.master_account;`))
	if err != nil {
		log.Printf("Failed select aggregation from bi_data_storage:%v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var accountMasterSlice []AccountMasterInner
	for rows.Next() {
		var accountMasterInner AccountMasterInner
		err := rows.Scan(&accountMasterInner.AccountEn, &accountMasterInner.AccountJp)
		if err != nil {
			log.Printf("Failed to convert to AccountMasterInner structure:%v", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		accountMasterSlice = append(accountMasterSlice, accountMasterInner)
	}

	accountMasterInnerJson, err := json.Marshal(&accountMasterSlice)
	if err != nil {
		log.Printf("Failed to convert to accountMasterInnerJson: %v", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(accountMasterInnerJson)

}

func postBudgetFunc(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Printf("Could not read json: %v", err)
		return
	}
	log.Printf(string(body))
	var inputData []PostDitailInner
	if err := json.Unmarshal(body, &inputData); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Printf("Could not unmarshal json: %v", err)
		return
	}
	db := connectDB()
	defer db.Close()

	for _, input := range inputData {
		ins, err := db.Prepare(`
			INSERT INTO bi_data_budget VALUES(
						?,
						?,
						(SELECT account_en FROM master_account WHERE account_jp = ?),
						?
						)
						ON DUPLICATE KEY UPDATE
						ammount = ?;`)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			log.Printf("Failed insert buget from bi_data_budget: %v", err)
			return
		}
		ins.Exec(input.Year, input.Month, input.Account, input.Amount, input.Amount)
		defer ins.Close()
	}

	w.WriteHeader(http.StatusCreated)
}
