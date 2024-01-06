/*
 * K2-BackEnd API
 *
 * K2のバックエンドAPI
 *
 * API version: 1.0.0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package swagger

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

func NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	for _, route := range routes {
		var handler http.Handler
		handler = route.HandlerFunc
		handler = Logger(handler, route.Name)

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}

	return router
}

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World!")
}

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/",
		Index,
	},

	Route{
		"AccountMasterGet",
		strings.ToUpper("Get"),
		"/account_master",
		AccountMasterGet,
	},

	Route{
		"AggregationGet",
		strings.ToUpper("Get"),
		"/aggregation",
		AggregationGet,
	},

	Route{
		"BudgetGet",
		strings.ToUpper("Get"),
		"/budget",
		BudgetGet,
	},

	Route{
		"BudgetPost",
		strings.ToUpper("Post"),
		"/budget",
		BudgetPost,
	},

	Route{
		"PerformanceGet",
		strings.ToUpper("Get"),
		"/performance",
		PerformanceGet,
	},

	Route{
		"PresentGet",
		strings.ToUpper("Get"),
		"/present",
		PresentGet,
	},

	Route{
		"PresentPost",
		strings.ToUpper("Post"),
		"/present",
		PresentPost,
	},

	Route{
		"PresentPut",
		strings.ToUpper("Put"),
		"/present",
		PresentPut,
	},
}
