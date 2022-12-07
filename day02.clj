(ns day02
  (:require [utils :as u]
            [hashp.core]
            [clojure.string :as str]
            [com.rpl.specter :as sp]
            [clojure.java.io :as io]))

(u/download-data 2022 2)
(def data (u/load-data "day02.dat"))
;; (def data "A Y
;; B X
;; C Z")

data
(def move-map {"A" 0 "B" 1 "C" 2 "X" 0 "Y" 1 "Z" 2})
(def score-map {0 3 1 0 2 6 -1 6 -2 0})
;;; First
(defn get-score
  [[pl1 pl2]]
  (->> (- pl1 pl2)
       score-map
       (+ (inc pl2))))


(->> (str/split-lines data)
     (map #(str/split % #" "))
     (sp/transform [sp/ALL sp/ALL] move-map)
     (map #(get-score %))
     (apply +))
;; => 12740

(->> (str/split-lines data)
     (map #(str/split % #" "))
     (sp/transform [sp/ALL sp/ALL] move-map)
     (map #(get-score %))
     (apply +))
;; => 12740
