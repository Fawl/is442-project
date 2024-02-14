INSERT INTO tags (tag_name, tag_type) VALUES
('Rock', 'Music'), -- 1
('Tech', 'Conference'), -- 2
('Art', 'Exhibition'), -- 3
('Classical', 'Music'), -- 4
('Film', 'Festival'); -- 5

INSERT INTO ticketedevent (title, venue, num_tickets, cancelled, start_time, end_time, image_link) VALUES
('Rock Concert', 'Madison Square Garden', 1000, FALSE, '2024-06-01 19:00:00', '2024-06-01 22:00:00', 'https://images.unsplash.com/photo-1619229666372-3c26c399a4cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4OTIwMTB8&ixlib=rb-4.0.3&q=80&w=1080'), -- 1
('Tech Conference', 'Convention Center', 500, FALSE, '2024-07-15 09:00:00', '2024-07-15 17:00:00', 'https://images.unsplash.com/photo-1599592187465-6dc742367282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4OTE1MjB8&ixlib=rb-4.0.3&q=80&w=1080'), -- 2
('Art Exhibition', 'National Gallery', 200, TRUE, '2024-08-20 10:00:00', '2024-08-20 20:00:00', 'https://images.unsplash.com/photo-1630416920377-e43f0f9dd28d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc5MDMzNzR8&ixlib=rb-4.0.3&q=80&w=1080'), -- 3
('Classical Music Performance', 'Symphony Hall', 300, FALSE, '2024-09-10 20:00:00', '2024-09-10 22:30:00', 'https://images.unsplash.com/photo-1465661910194-fd1393a57d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc5MDQxMTB8&ixlib=rb-4.0.3&q=80&w=1080'), -- 4
('Film Festival', 'Downtown Cinema', 400, FALSE, '2024-10-05 12:00:00', '2024-10-05 23:00:00', 'https://images.unsplash.com/photo-1605610492209-ddaae3432fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc5MDMzOTh8&ixlib=rb-4.0.3&q=80&w=1080'); -- 5

INSERT INTO eventtags (event_id, tag_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
