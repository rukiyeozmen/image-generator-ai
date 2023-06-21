
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />

  <h3 align="center">imagenius/h3>

  <p align="center"> "Imagenius" is an impressive web application developed as the final project for a web development bootcamp.
  </p>
</div>

## About The Project
<p>Imagenuis is an exceptional web application that combines the power of artificial intelligence to generate captivating images and creative hashtags. Designed as the culmination of a web development bootcamp, this innovative platform delivers an unparalleled user experience by harnessing the capabilities of AI. Users can access a vast collection of AI-generated images, ensuring a never-ending source of visual inspiration. Additionally, Imagenuis provides a unique feature of AI-generated hashtags, allowing users to effortlessly enhance their social media presence with engaging and relevant content. With its seamless functionality and cutting-edge technology, Imagenuis truly stands out as a remarkable achievement in the realm of web development.</p>

[![Main Page][Main]](https://i.imgur.com/0DE9UCc.png)
[![Latest images page][Latest]](https://i.imgur.com/cHwrT4z.png)
[![Favorite Page][Favorite]](https://i.imgur.com/1ATf8t0.png)


### Built With

* [![React][React.js]][React-url]
* [![Express][Express.js]][Express-url]
* [![Postgress][postgresql.org]][PSQL-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]


### Installation

Clone the application to your computer. 
1. Install NPM packages
   ```sh
   npm install
   ```
   For both folders /frontend and /backend.

2. Create your own .ENV file in the Backend folder. Generate API keys from this [https://openai.com/](https://openai.com/).
    PORT = 8000

    OPENAI_API_KEY_IMAGE = 'ENTER YOUR API'
    OPENAI_API_KEY_TEXT = 'ENTER YOUR API'

    PGHOST=localhost
    PGUSER=labber
    PGDATABASE=final
    PGPASSWORD="labber"
    PGPORT=5432

3. Create a new database connection and run this commands:
   a. Run scheema \i db/schema/image_generator.sql
   b. Run seeds  \i db/seeds/01_images.sql







<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
