-- CreateTable
CREATE TABLE `AddressUser` (
    `userId` BIGINT NOT NULL,
    `addressId` BIGINT NOT NULL,

    PRIMARY KEY (`userId`, `addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `addressId` BIGINT NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(100) NOT NULL,
    `number` INTEGER NOT NULL,
    `city` VARCHAR(150) NOT NULL,
    `state` VARCHAR(2) NOT NULL,
    `landmark` VARCHAR(50) NOT NULL,
    `complement` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userId` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    `password` VARCHAR(250) NOT NULL,
    `phoneNumber` VARCHAR(11) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restaurant` (
    `restaurantId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `description` VARCHAR(250) NOT NULL,
    `phoneNumber` VARCHAR(11) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `addressId` BIGINT NOT NULL,

    PRIMARY KEY (`restaurantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RestaurantOpeningHours` (
    `restaurantOpeningHoursId` TINYINT NOT NULL AUTO_INCREMENT,
    `restaurantRestaurantId` INTEGER NOT NULL,

    PRIMARY KEY (`restaurantOpeningHoursId`, `restaurantRestaurantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DischesCategory` (
    `dischesCategoryId` TINYINT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`dischesCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dishes` (
    `dishesId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    `dischesCategoryId` TINYINT NOT NULL,

    PRIMARY KEY (`dishesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RestaurantDisches` (
    `restaurantId` INTEGER NOT NULL,
    `dishesId` INTEGER NOT NULL,

    PRIMARY KEY (`dishesId`, `restaurantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    `restaurantId` INTEGER NOT NULL,
    `dishesId` INTEGER NOT NULL,
    `userId` BIGINT NOT NULL,
    `total` DECIMAL(15, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`orderId`, `restaurantId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AddressUser` ADD CONSTRAINT `AddressUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AddressUser` ADD CONSTRAINT `AddressUser_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`addressId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restaurant` ADD CONSTRAINT `Restaurant_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`addressId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestaurantOpeningHours` ADD CONSTRAINT `RestaurantOpeningHours_restaurantRestaurantId_fkey` FOREIGN KEY (`restaurantRestaurantId`) REFERENCES `Restaurant`(`restaurantId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dishes` ADD CONSTRAINT `Dishes_dischesCategoryId_fkey` FOREIGN KEY (`dischesCategoryId`) REFERENCES `DischesCategory`(`dischesCategoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestaurantDisches` ADD CONSTRAINT `RestaurantDisches_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`restaurantId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestaurantDisches` ADD CONSTRAINT `RestaurantDisches_dishesId_fkey` FOREIGN KEY (`dishesId`) REFERENCES `Dishes`(`dishesId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`restaurantId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_dishesId_fkey` FOREIGN KEY (`dishesId`) REFERENCES `Dishes`(`dishesId`) ON DELETE RESTRICT ON UPDATE CASCADE;
