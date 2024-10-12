use booklists;

DROP TABLE IF EXISTS books;
CREATE TABLE books (
  id         VARCHAR(128) NOT NULL,
  name      VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  author     VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  imagePath   VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO books
  (id,name,author,imagePath)
VALUES
  ('gn0y2rmj09to2tb6q2t1o1x1m5wdnt03','Sống để kể lại những anh hùng', 'Nguyễn Quang Chánh', 'c:/Users/The Anh/Desktop/Images/gn0y2rmj09to2tb6q2t1o1x1m5wdnt03.jpg'),
  ('y8o3d04slxh5dtvwhefvbcwfgslfaly8','Học, Đọc sách và Sáng tạo', 'Nguyễn Như Ý - Trần Chí Đạt - Võ Thế Quân - Vũ Thùy Dương', 'c:/Users/The Anh/Desktop/Images/y8o3d04slxh5dtvwhefvbcwfgslfaly8.jpg'),
  ('e4udknc6epuveyv0jhdtvhpabc2gb99e', 'Quốc Sử Di Biên', 'Phan Thúc Trực', 'c:/Users/The Anh/Desktop/Images/e4udknc6epuveyv0jhdtvhpabc2gb99e.jpeg'),
  ('nbkeq8e0y2mq978j4cxqnd81sbk5vzw1', 'Viện Trợ Nước Ngoài Cho Việt Nam (Đối Với Giáo Dục Và Đào Tạo 1954 - 1975)','TS. Nguyễn Thúy Quỳnh', 'c:/Users/The Anh/Desktop/Images/nbkeq8e0y2mq978j4cxqnd81sbk5vzw1.jpg');