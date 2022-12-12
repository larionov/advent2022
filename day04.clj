(ns day03
  (:require [utils :as u]
            [hashp.core]
            [clojure.string :as str]
            [com.rpl.specter :as sp]
            [clojure.java.io :as io]))

(u/download-data 2022 4)

(def data (u/load-data "day04.dat"))
(def data "2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8")

data
(->> (str/split-lines data)
     (map #(str/split % #","))
     (sp/transform [sp/ALL sp/ALL] #(str/split % #"-"))
     (sp/transform [sp/ALL sp/ALL sp/ALL] u/char->int)
     (map #(map - (first %) (last %)))
     (map #(sort < %))
     (filter #(<= (first %) 0 (last %)))
     count)
;; => 462

(->> (str/split-lines data)
     (map #(str/split % #","))
     (sp/transform [sp/ALL sp/ALL] #(str/split % #"-"))
     (sp/transform [sp/ALL sp/ALL sp/ALL] u/char->int)
     (map #(concat (first %) (last %)))
     (filter #(not (apply < %)))
     count)
