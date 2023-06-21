-- Insert sample data for the Users table
INSERT INTO Users (username, email, password) VALUES
  ('John', 'user1@example.com', 'password1'),
  ('user2', 'user2@example.com', 'password2'),
  ('user3', 'user3@example.com', 'password3');

-- Insert sample data for the Images table
INSERT INTO Images (image_url) VALUES
  ('https://i.imgur.com/DHU5Jg7.png'),
  ('https://i.imgur.com/etFhqQl.png'),
  ('https://i.imgur.com/cFijKQT.png'),
  ('https://i.imgur.com/YpzGE0D.png'),
  ('https://i.imgur.com/gAkahvh.png'),
  ('https://i.imgur.com/HqgHTE2.png'),
  ('https://i.imgur.com/OakaUr7.png'),
  ('https://i.imgur.com/qRA431Z.png'),
  ('https://i.imgur.com/kBz7zZ6.png'),
  ('https://i.imgur.com/jUcOEpB.png');


-- Insert sample data for the Captions table
INSERT INTO Captions (caption, user_id, image_id) VALUES
  ('Beautiful sunset', 1, 1),
  ('Delicious pizza', 1, 2),
  ('Amazing city view', 2, 3);


-- Insert sample data for the Captions table
INSERT INTO Themes (label, content) VALUES
  ('sketch', 'in the style of Hand-drawn with graphite pencil'),
  ('painting', 'painted in the style of John Audubon'),
  ('anime', 'In the style of anime from neon genesis evangelion'),
  ('miami', 'in the style of miami vice synthwave and neo tokyo retro vibes'),
  ('vector', 'in retro vector illustration'), 
  ('3D', 'in the style of a 3D render'),
  ('realistic', 'with detailed, photo-realistic, diffused soft lighting, sharp focus, hyperrealism, cinematic lighting'),
  ('gauche', 'Expressive dark matte gouche painting. --ar 4:5' );



--Isert sample data for Favorite page
INSERT INTO Favorites (image_url, username) Values
  ('https://i.imgur.com/YpzGE0D.png', 'John'),
  ('https://i.imgur.com/ZBTiuhF.png', 'John'), 
  ('https://i.imgur.com/cFijKQT.png', 'John'), 
  ('https://i.imgur.com/etFhqQl.png', 'John'),
  ('https://i.imgur.com/OakaUr7.png', 'John'),
  ('https://i.imgur.com/kBz7zZ6.png', 'John'),
  ('https://i.imgur.com/jUcOEpB.png', 'John');
