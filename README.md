# Live Links
Skip the installation and try out the applications through these sites:
* Back-End: https://api-back.adaptable.app/
* Front-End: https://dsmontecastro.github.io/Accodal-Assessment/



### Local Setup
* Install [Node](https://nodejs.org/en/download) & [PNPM](https://pnpm.io/installation), if needed.

* Clone the repository.
  ```sh
  git clone https://github.com/dsmontecastro/Accodal-Assessment.git
  ```

* Navigate to the repository root and install the necessary packages.
  ```sh
  pnpm install
  ```

* Make new `.env` files for both applications:
    * Back-End
        ```sh
        HOST = 'localhost'    # or '127.0.0.1'
        PORT = 4000           # or any usable port
        ```
    * Front-End
        ```sh
        VITE_PEXELS_KEY = ''    # Supplied by signing-up at Pexels.com
        ```

* Move (`cd`) to either __./frontend__ or __./backend__ folders and run these commands in order:
  ```sh
  pnpm run build
  pnpm run start
  ```

* Finally, `CTRL + Click` the links shown in the terminal to check out the apps!