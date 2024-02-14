INSERT INTO tags (tag_name, tag_type) VALUES
('Rock', 'Music'), -- 1
('Tech', 'Conference'), -- 2
('Art', 'Exhibition'), -- 3
('Classical', 'Music'), -- 4
('Film', 'Festival'); -- 5

INSERT INTO ticketedevent (title, venue, num_tickets, cancelled, start_time, end_time, image_link) VALUES
('Rock Concert', 'Madison Square Garden', 1000, FALSE, '2024-06-01 19:00:00', '2024-06-01 22:00:00', 'http://example.com/rockconcert.jpg'), -- 1
('Tech Conference', 'Convention Center', 500, FALSE, '2024-07-15 09:00:00', '2024-07-15 17:00:00', 'http://example.com/techconference.jpg'), -- 2
('Art Exhibition', 'National Gallery', 200, TRUE, '2024-08-20 10:00:00', '2024-08-20 20:00:00', 'http://example.com/artexhibition.jpg'), -- 3
('Classical Music Performance', 'Symphony Hall', 300, FALSE, '2024-09-10 20:00:00', '2024-09-10 22:30:00', 'http://example.com/classicalmusic.jpg'), -- 4
('Film Festival', 'Downtown Cinema', 400, FALSE, '2024-10-05 12:00:00', '2024-10-05 23:00:00', 'http://example.com/filmfestival.jpg'); -- 5

INSERT INTO eventtags (event_id, tag_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
