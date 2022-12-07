(ns day03
  (:require [utils :as u]
            [hashp.core]
            [clojure.string :as str]
            [com.rpl.specter :as sp]
            [clojure.java.io :as io]))

(u/download-data 2022 3)
(def alpha " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

(def data (u/load-data "day03.dat"))
;; (def data
;;   "vJrwpWtwJgWrhcsFMMfFFhFp
;; jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
;; PmmdzqPrVvPwwTWBwg
;; wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
;; ttgJtRGJQctTZtZT
;; CrZsJsPPZsGzwwsLwLmpwMDw")

data
(->> (str/split-lines data)
     (map #(partition (/ (count %) 2) %))
     (sp/transform [sp/ALL sp/ALL] set)
     (map #(apply clojure.set/intersection %))
     (map first)
     (map #(str/index-of alpha %))
     (apply +))
;; => 7811

(->> (str/split-lines data)
     (partition 3)
     (sp/transform [sp/ALL sp/ALL] set)
     (map #(apply clojure.set/intersection %))
     (map first)
     (map #(str/index-of alpha %))
     (apply +))
;; => 2639
;
