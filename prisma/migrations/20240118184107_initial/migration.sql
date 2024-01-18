-- CreateTable
CREATE TABLE `AddressUser` (
    `userId` INTEGER NOT NULL,
    `addressId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `addressId` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(100) NOT NULL,
    `number` INTEGER NOT NULL,
    `neighborhood` VARCHAR(100) NOT NULL,
    `city` VARCHAR(150) NOT NULL,
    `state` VARCHAR(2) NOT NULL,
    `landmark` VARCHAR(50) NOT NULL,
    `complement` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
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
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `description` VARCHAR(250) NOT NULL,
    `imageUrl` VARCHAR(150) NOT NULL,
    `phoneNumber` VARCHAR(11) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `addressId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RestaurantOpeningHours` (
    `restaurantOpeningHoursId` TINYINT NOT NULL AUTO_INCREMENT,
    `restaurantId` INTEGER NOT NULL,
    `day` TINYINT NOT NULL,
    `openTime` TIME NOT NULL,
    `closeTime` TIME NOT NULL,

    PRIMARY KEY (`restaurantOpeningHoursId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DishesCategory` (
    `dishesCategoryId` TINYINT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`dishesCategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dish` (
    `dishId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    `imageUrl` VARCHAR(150) NOT NULL,
    `dishesCategoryId` TINYINT NOT NULL,
    `restaurantId` INTEGER NOT NULL,

    PRIMARY KEY (`dishId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    `restaurantId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `total` DECIMAL(15, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderRestaurantDishes` (
    `orderId` INTEGER NOT NULL,
    `dishId` INTEGER NOT NULL,

    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AddressUser` ADD CONSTRAINT `AddressUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AddressUser` ADD CONSTRAINT `AddressUser_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`addressId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restaurant` ADD CONSTRAINT `Restaurant_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`addressId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RestaurantOpeningHours` ADD CONSTRAINT `RestaurantOpeningHours_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dish` ADD CONSTRAINT `Dish_dishesCategoryId_fkey` FOREIGN KEY (`dishesCategoryId`) REFERENCES `DishesCategory`(`dishesCategoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Dish` ADD CONSTRAINT `Dish_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `Restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderRestaurantDishes` ADD CONSTRAINT `OrderRestaurantDishes_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`orderId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderRestaurantDishes` ADD CONSTRAINT `OrderRestaurantDishes_dishId_fkey` FOREIGN KEY (`dishId`) REFERENCES `Dish`(`dishId`) ON DELETE RESTRICT ON UPDATE CASCADE;
