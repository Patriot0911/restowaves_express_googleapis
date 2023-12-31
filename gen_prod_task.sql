-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema products
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `products` ;

-- -----------------------------------------------------
-- Schema products
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `products` DEFAULT CHARACTER SET utf8 ;
USE `products` ;

-- -----------------------------------------------------
-- Table `products`.`productModels`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `products`.`productModels` ;

CREATE TABLE IF NOT EXISTS `products`.`productModels` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `modelName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `modelName_UNIQUE` ON `products`.`productModels` (`modelName` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `products`.`productInfo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `products`.`productInfo` ;

CREATE TABLE IF NOT EXISTS `products`.`productInfo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `productSpecId` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `productModelId` INT NOT NULL,
  PRIMARY KEY (`id`, `productSpecId`),
  CONSTRAINT `modelId`
    FOREIGN KEY (`productModelId`)
    REFERENCES `products`.`productModels` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE INDEX `modelId_idx` ON `products`.`productInfo` (`productModelId` ASC) VISIBLE;

CREATE UNIQUE INDEX `product_uniq_idx` ON `products`.`productInfo` (`productSpecId` ASC, `productModelId` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `products`.`productHasSize`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `products`.`productHasSize` ;

CREATE TABLE IF NOT EXISTS `products`.`productHasSize` (
  `productId` INT NOT NULL,
  `size` INT NOT NULL,
  PRIMARY KEY (`productId`),
  CONSTRAINT `productId`
    FOREIGN KEY (`productId`)
    REFERENCES `products`.`productInfo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
