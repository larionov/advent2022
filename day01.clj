(ns day01
  (:require [utils :as u]
            [hashp.core]
            [clojure.string :as str]
            [com.rpl.specter :as sp]
            [clojure.java.io :as io]))

(u/download-data 2022 1)
(def data (u/load-data "day01.dat"))

data

;;; First
(->> (str/split data #"\n\n")
     (map #(str/split-lines %))
     (sp/transform [sp/ALL sp/ALL] u/parse-int)
     (map #(apply + %))
     sort
     reverse
     first)
;; => 73211


(->> (str/split data #"\n\n")
     (map #(str/split-lines %))
     (sp/transform [sp/ALL sp/ALL] u/parse-int)
     (map #(apply + %))
     sort
     reverse
     (take 3)
     (apply +))
;; => 213958
