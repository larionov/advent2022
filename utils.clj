(ns utils
  (:require [clojure.java.io :as io]
            [clj-http.client :as client]
            [hashp.core]
            [clojure.edn :as edn]))



(defn load-data [filename] (slurp (str "data/" filename)))

(defn parse-bigint [s] "string->int" (biginteger (re-find #"\-?\d+" s)))



(defn parse-int
  "string->int"
  ([s] (parse-int s nil))
  ([s default]
   (try (Integer. (re-find #"\-?\d+" s)) (catch Exception r default))))


(defn download-data
  "if file doesn't already exist, download the data and store in
  data/day#.dat"
  [year day]
  (let
    [fname (format "day%02d.dat" day)
     url (str "https://adventofcode.com/" year "/day/" day "/input")
     cookie
     "session=53616c7465645f5f585f17349d1d25444a7b9359a78d92e5db16fb7458e1dea1850adf351f756a17aaceff27ba3edbbe68aae42d75c95b0b1d68aba9e5e82460"
     outfile (format "data/%s" fname)]
    (if (not (.exists (io/file outfile)))
      (let [data (:body (client/get url {:headers {:Cookie cookie}}))]
        (spit outfile data))
      "File already exists")))



(defn abs [n] (max n (- n)))

(defn char->int [c] (Long/parseLong (String/valueOf c)))

(defn gcd [a b] (if (zero? b) a (recur b (mod a b))))

(defn lcm [a b] (/ (abs (* a b)) (gcd a b)))
