-- Independent tables
INSERT INTO user_table(email, password_hash, user_type, balance) VALUES
('test1@example.com', 'Password@888', 'customer', 10000), -- 1
('test2@example.com', 'Password@888', 'ticket_officer', 10000), -- 2
('test3@example.com', 'Password@888', 'ticket_officer', 10000), -- 3
('one@manager.com', 'Password@888', 'event_manager', 10000), -- 4
('two@manager.com', 'Password@888', 'event_manager', 10000), -- 5
('three@manager.com', 'Password@888', 'event_manager', 10000), -- 6
('one@ticket.com', 'Password@888', 'ticket_officer', 10000), -- 7
('two@ticket.com', 'Password@888', 'ticket_officer', 10000), -- 8
('three@ticket.com', 'Password@888', 'ticket_officer', 10000); -- 9

INSERT INTO tags (tag_name, tag_type) VALUES
('Rock', 'Music'), -- 1
('Tech', 'Conference'), -- 2
('Art', 'Exhibition'), -- 3
('Classical', 'Music'), -- 4
('Film', 'Festival'); -- 5

-- Tables with requirement
INSERT INTO ticketedevent (title, venue, num_tickets, cancelled, price, start_time, end_time, image_link, created_by) VALUES
(
    'Rock Concert', 
    'Madison Square Garden', 
    1000, 
    FALSE, 
    100.0, 
    '2024-06-01 19:00:00', 
    '2024-06-01 22:00:00', 
    'https://images.unsplash.com/photo-1619229666372-3c26c399a4cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4OTIwMTB8&ixlib=rb-4.0.3&q=80&w=1080',
    4
), -- 1
(
    'Tech Conference', 
    'Convention Center', 
    500, 
    FALSE, 
    200.0, 
    '2024-07-15 09:00:00', 
    '2024-07-15 17:00:00', 
    'https://images.unsplash.com/photo-1599592187465-6dc742367282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc4OTE1MjB8&ixlib=rb-4.0.3&q=80&w=1080',
    5
), -- 2
(
    'Art Exhibition', 
    'National Gallery', 
    200, 
    TRUE, 
    300.0, 
    '2024-08-20 10:00:00', 
    '2024-08-20 20:00:00', 
    'https://images.unsplash.com/photo-1630416920377-e43f0f9dd28d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc5MDMzNzR8&ixlib=rb-4.0.3&q=80&w=1080',
    5
), -- 3
(
    'Classical Music Performance', 
    'Symphony Hall', 
    300, 
    FALSE, 
    300.0, 
    '2024-09-10 20:00:00', 
    '2024-09-10 22:30:00', 
    'https://images.unsplash.com/photo-1465661910194-fd1393a57d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc5MDQxMTB8&ixlib=rb-4.0.3&q=80&w=1080',
    4
), -- 4
(
    'Film Festival', 
    'Downtown Cinema', 
    400, 
    FALSE, 
    400.0, 
    '2024-10-05 12:00:00', 
    '2024-10-05 23:00:00', 
    'https://images.unsplash.com/photo-1605610492209-ddaae3432fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NjY5NTJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc5MDMzOTh8&ixlib=rb-4.0.3&q=80&w=1080',
    5
); -- 5

INSERT INTO eventtags (event_id, tag_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO event_can_manage (user_id, event_id) VALUES
(7, 1),
(7, 2),
(7, 3),
(7, 4),
(8, 5);

INSERT INTO ticket (event_id, bought_by, price) VALUES
(4, 7, 300),
(1, 8, 100),
(1, 7, 100),
(4, 9, 300),
(3, 9, 300),
(2, 2, 200),
(4, 8, 300),
(1, 5, 100),
(4, 7, 300),
(2, 6, 200),
(2, 7, 200),
(1, 7, 100),
(1, 6, 100),
(5, 6, 400),
(2, 4, 200),
(4, 3, 300),
(4, 4, 300),
(2, 3, 200),
(1, 2, 100),
(5, 5, 400),
(2, 2, 200),
(1, 4, 100),
(1, 1, 100),
(5, 2, 400),
(4, 6, 300),
(4, 2, 300),
(3, 4, 300),
(5, 6, 400),
(3, 9, 300),
(3, 6, 300),
(4, 1, 300),
(3, 7, 300),
(1, 2, 100),
(4, 8, 300),
(4, 6, 300),
(4, 2, 300),
(1, 6, 100),
(5, 4, 400),
(3, 5, 300),
(3, 4, 300),
(5, 8, 400),
(1, 1, 100),
(2, 9, 200),
(4, 8, 300),
(2, 4, 200),
(4, 6, 300),
(5, 4, 400),
(2, 6, 200),
(2, 4, 200),
(4, 2, 300),
(4, 2, 300),
(2, 9, 200),
(4, 6, 300),
(3, 3, 300),
(3, 8, 300),
(2, 3, 200),
(4, 1, 300),
(1, 3, 100),
(5, 7, 400),
(3, 1, 300),
(2, 7, 200),
(4, 9, 300),
(3, 6, 300),
(4, 5, 300),
(2, 3, 200),
(4, 1, 300),
(3, 4, 300),
(1, 8, 100),
(1, 4, 100),
(3, 8, 300),
(3, 8, 300),
(4, 6, 300),
(3, 1, 300),
(3, 1, 300),
(2, 7, 200),
(5, 1, 400),
(2, 3, 200),
(1, 1, 100),
(4, 5, 300),
(1, 6, 100),
(5, 2, 400),
(2, 9, 200),
(4, 9, 300),
(4, 7, 300),
(3, 6, 300),
(2, 8, 200),
(2, 9, 200),
(1, 1, 100),
(5, 6, 400),
(1, 4, 100),
(1, 7, 100),
(2, 6, 200),
(5, 8, 400),
(5, 1, 400),
(2, 3, 200),
(2, 4, 200),
(1, 3, 100),
(5, 8, 400),
(1, 1, 100),
(3, 4, 300);