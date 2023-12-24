package swagger

import (
	"database/sql"
	"log"
	"time"

	"github.com/go-sql-driver/mysql"
)

func connectDB() *sql.DB {
	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		log.Printf("Faild convart jst:%v", err)
	}
	c := mysql.Config{
		DBName:               "bi",
		User:                 "linux_server",
		Passwd:               "Miruta728@",
		Addr:                 "192.168.1.200:3306",
		Net:                  "tcp",
		ParseTime:            true,
		Collation:            "utf8mb4_unicode_ci",
		Loc:                  jst,
		AllowNativePasswords: true,
	}
	db, err := sql.Open("mysql", c.FormatDSN())
	if err != nil {
		log.Printf("Failed connect MySQL:%v", err)
	}
	return db
}
