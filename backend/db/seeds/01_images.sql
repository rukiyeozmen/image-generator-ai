-- Insert sample data for the Users table
INSERT INTO Users (username, email, password) VALUES
  ('user1', 'user1@example.com', 'password1'),
  ('user2', 'user2@example.com', 'password2'),
  ('user3', 'user3@example.com', 'password3');

-- Insert sample data for the Images table
INSERT INTO Images (image_url, keyword, user_id) VALUES
  ('https://plus.unsplash.com/premium_photo-1677151193419-9be7a26c02cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2883&q=80', 'nature', 1),
  ('https://plus.unsplash.com/premium_photo-1677151193419-9be7a26c02cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2883&q=80', 'food', 1),
  ('https://plus.unsplash.com/premium_photo-1677151193419-9be7a26c02cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2883&q=80', 'travel', 2);

-- Insert sample data for the Captions table
INSERT INTO Captions (caption, user_id, image_id) VALUES
  ('Beautiful sunset', 1, 1),
  ('Delicious pizza', 1, 2),
  ('Amazing city view', 2, 3);


-- Insert sample data for the Captions table
INSERT INTO Themes (label, content) VALUES
  ('sketch', 'in the style of Hand-drawn with graphite pencil'),
  ('anime', 'In the style of anime from studio ghibli'),
  ('miami', 'in the style of miami vice synthwave and neo tokyo retro vibes')