-- Migration: add imageAlt column to Service table
-- Run this once in phpMyAdmin on the live database

ALTER TABLE `Service`
  ADD COLUMN `imageAlt` VARCHAR(200) NULL AFTER `image`;
