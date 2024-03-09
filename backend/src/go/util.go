package swagger

import (
	"database/sql"
	"log"
	"time"

	"github.com/caarlos0/env/v10"
	"github.com/go-sql-driver/mysql"
)

type dbConfig struct {
	DBName               string `env:"DB_NAME"`
	User                 string `env:"DB_USER"`
	Passwd               string `env:"DB_PASSWORD"`
	Addr                 string `env:"DB_ADDRESS"`
	Net                  string `env:"DB_NET"`
	ParseTime            bool   `env:"DB_PARSE_TIME"`
	Collation            string `env:"DB_COLLATION"`
	AllowNativePasswords bool   `env:"DB_ALLOW_NATIVE_PASSWOREDS"`
}

func connectDB() *sql.DB {
	config := dbConfig{}
	if err := env.Parse(&config); err != nil {
		log.Printf("Failed convert env:%v", err)
	}
	jst, err := time.LoadLocation("Asia/Tokyo")
	if err != nil {
		log.Printf("Failed convert jst:%v", err)
	}
	c := mysql.Config{
		DBName:               config.DBName,
		User:                 config.User,
		Passwd:               config.Passwd,
		Addr:                 config.Addr,
		Net:                  config.Net,
		ParseTime:            config.ParseTime,
		Collation:            config.Collation,
		Loc:                  jst,
		AllowNativePasswords: config.AllowNativePasswords,
	}
	db, err := sql.Open("mysql", c.FormatDSN())
	if err != nil {
		log.Printf("Failed connect MySQL:%v", err)
	}
	return db
}
