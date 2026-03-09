CREATE TABLE `registers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `degree` varchar(50) NOT NULL,
  `branch_code` varchar(10) NOT NULL,
  `period` varchar(50) NOT NULL,
  `year` int(4) NOT NULL,
  `certificate_type` varchar(100) NOT NULL,
  `controller_lr_no` varchar(100) NOT NULL,
  `date_issued` date NOT NULL,
  `programme` varchar(50) NOT NULL,
  `regulation` varchar(10) NOT NULL,
  `semester` varchar(10) NOT NULL,
  `examination` varchar(50) NOT NULL,
  `batch` varchar(20) NOT NULL,
  `mode` varchar(20) NOT NULL,
  `total_registered` int(11) NOT NULL,
  `received` int(11) NOT NULL,
  `balance` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `register_rows` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `register_id` int(11) NOT NULL,
  `reg_no_range` varchar(255) NOT NULL,
  `subtotal` int(11) NOT NULL,
  `remarks` text,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`register_id`) REFERENCES `registers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `missing_numbers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `row_id` int(11) NOT NULL,
  `reg_no` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`row_id`) REFERENCES `register_rows`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
