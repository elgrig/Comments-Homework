/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   comments: () => (/* binding */ comments),\n/* harmony export */   fetchAndRenderComments: () => (/* binding */ fetchAndRenderComments),\n/* harmony export */   renderMainPage: () => (/* binding */ renderMainPage)\n/* harmony export */ });\n/* harmony import */ var _modules_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/api.js */ \"./modules/api.js\");\n/* harmony import */ var _modules_date_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/date.js */ \"./modules/date.js\");\n/* harmony import */ var _modules_renderComments_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/renderComments.js */ \"./modules/renderComments.js\");\n\r\n\r\n\r\n\r\nlet comments = [];\r\n\r\nfunction fetchAndRenderComments() {\r\n    (0,_modules_api_js__WEBPACK_IMPORTED_MODULE_0__.getComments)().then((responseData) => {\r\n        console.log(responseData);\r\n        const appComments = responseData.comments.map((comment) => {\r\n            return {\r\n                name: comment.author.name,\r\n                date: (0,_modules_date_js__WEBPACK_IMPORTED_MODULE_1__.getDate)(comment.date),\r\n                text: comment.text,\r\n                likes: comment.likes,\r\n                isLiked: false,\r\n            }\r\n        });\r\n        comments = appComments;\r\n        (0,_modules_renderComments_js__WEBPACK_IMPORTED_MODULE_2__.renderComments)({ comments });\r\n        const preloaderElement = document.getElementById(\"preloader\");\r\n        preloaderElement.classList.add('hide');\r\n        }).catch((error) => {\r\n        if (error.message === 'Сервер недоступен') {\r\n            console.log(error); // alert(error.message);\r\n        } else {\r\n            console.log(error); // alert('Кажется, у вас сломался интернет, попробуйте позже');\r\n        }\r\n        console.log(error);\r\n    });\r\n};\r\n\r\nfunction renderMainPage() {\r\n    const container = document.getElementById(\"container\");\r\n    container.innerHTML = `<div class=\"preloader\" id=\"preloader\">Страница загружается...</div><ul class=\"comments\"></ul><div class=\"form\"></div>`;\r\n    (0,_modules_renderComments_js__WEBPACK_IMPORTED_MODULE_2__.renderForm)();\r\n    fetchAndRenderComments();\r\n  };\r\n  \r\nrenderMainPage();\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./main.js?");

/***/ }),

/***/ "./modules/api.js":
/*!************************!*\
  !*** ./modules/api.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getComments: () => (/* binding */ getComments),\n/* harmony export */   login: () => (/* binding */ login),\n/* harmony export */   postComment: () => (/* binding */ postComment),\n/* harmony export */   registration: () => (/* binding */ registration),\n/* harmony export */   setUser: () => (/* binding */ setUser),\n/* harmony export */   user: () => (/* binding */ user)\n/* harmony export */ });\nlet user = localStorage.getItem(\"user\") ? JSON.parse(localStorage.getItem(\"user\")) : null;\r\n\r\nconst setUser = (newUser) => {\r\n    user = newUser;\r\n};\r\n\r\nfunction getComments() {\r\n    return fetch(\"https://wedev-api.sky.pro/api/v2/elena-nikitenko/comments\", {\r\n        method: \"GET\",\r\n    }).then((response) => {\r\n        if (response.status === 500) {\r\n            throw new Error('Сервер недоступен');\r\n        } else if (response.status === 400) {\r\n            throw new Error('Неправильный логин / пароль')\r\n        }\r\n        return response.json();\r\n    });\r\n}\r\n\r\nfunction postComment({ name, text }) {\r\n    return fetch(\"https://wedev-api.sky.pro/api/v2/elena-nikitenko/comments\", {\r\n        method: \"POST\",\r\n        headers: {\r\n            Authorization: `Bearer ${user.token}`,\r\n        },\r\n        body: JSON.stringify({\r\n            name: name,\r\n            text: text,\r\n            forceError: false,\r\n        },)\r\n    }).then((response) => {\r\n        if (response.status === 201) {\r\n            return response.json();\r\n        } else if (response.status === 400) {\r\n            throw new Error('Имя / коммент содержат менее 3 символов');\r\n        } else if (response.status === 500) {\r\n            throw new Error('Сервер недоступен');\r\n        } else {\r\n            throw new Error('Другая ошибка');\r\n        }\r\n    })\r\n}\r\n\r\nfunction login({ login, password }) {\r\n    return fetch(\"https://wedev-api.sky.pro/api/user/login\", {\r\n        method: \"POST\",\r\n        body: JSON.stringify({\r\n            login,\r\n            password,\r\n        },)\r\n    }).then((response) => {\r\n        if (response.status === 201) {\r\n            return response.json();\r\n        } else if (response.status === 400) {\r\n            throw new Error('Неверный логин / пароль');\r\n        } else if (response.status === 500) {\r\n            throw new Error('Сервер недоступен');\r\n        } else {\r\n            throw new Error('Другая ошибка');\r\n        }\r\n    });\r\n}\r\n\r\nfunction registration({ name, login, password }) {\r\n    return fetch(\"https://wedev-api.sky.pro/api/user\", {\r\n        method: \"POST\",\r\n        body: JSON.stringify({\r\n            name,\r\n            login,\r\n            password,\r\n        },)\r\n    }).then((response) => {\r\n        if (response.status === 201) {\r\n            return response.json();\r\n        } else if (response.status === 400) {\r\n            throw new Error('Пользователь с таким логином уже существует');\r\n        } else if (response.status === 500) {\r\n            throw new Error('Сервер недоступен');\r\n        } else {\r\n            throw new Error('Другая ошибка');\r\n        }\r\n    });\r\n}\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/api.js?");

/***/ }),

/***/ "./modules/date.js":
/*!*************************!*\
  !*** ./modules/date.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getDate: () => (/* binding */ getDate)\n/* harmony export */ });\nfunction getDate(date) {\r\n    const currentDate = new Date(date);\r\n    const months = [\"января\", \"февраля\", \"марта\", \"апреля\", \"мая\", \"июня\", \"июля\", \"августа\", \"сентября\", \"октября\", \"ноября\", \"декабря\"];\r\n    const minutes = [\"00\", \"01\", \"02\", \"03\", \"04\", \"05\", \"06\", \"07\", \"08\", \"09\", \"10\", \"11\", \"12\", \"13\", \"14\", \"15\", \"16\", \"17\", \"18\", \"19\", \"20\", \"21\", \"22\", \"23\", \"24\", \"25\", \"26\", \"27\", \"28\", \"29\", \"30\", \"31\", \"32\", \"33\", \"34\", \"35\", \"36\", \"37\", \"38\", \"39\", \"40\", \"41\", \"42\", \"43\", \"44\", \"45\", \"46\", \"47\", \"48\", \"49\", \"50\", \"51\", \"52\", \"53\", \"54\", \"55\", \"56\", \"57\", \"58\", \"59\"];\r\n    return currentDate.getDate() + \" \" + months[currentDate.getMonth()] + \" \" + currentDate.getFullYear() + \" \" + currentDate.getHours() + \":\" + minutes[currentDate.getMinutes()];\r\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/date.js?");

/***/ }),

/***/ "./modules/listeners.js":
/*!******************************!*\
  !*** ./modules/listeners.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initLikeComments: () => (/* binding */ initLikeComments),\n/* harmony export */   initRepostCommentElements: () => (/* binding */ initRepostCommentElements)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main.js */ \"./main.js\");\n/* harmony import */ var _renderComments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderComments.js */ \"./modules/renderComments.js\");\n\r\n\r\n\r\n\r\n\r\nconst initLikeComments = () => {\r\n    const likeCommentsElements = document.querySelectorAll(\".like-button\");\r\n    for (const likeCommentElement of likeCommentsElements) {\r\n        likeCommentElement.addEventListener('click', (event) => {\r\n            const index = likeCommentElement.dataset.index;\r\n            if (_main_js__WEBPACK_IMPORTED_MODULE_0__.comments[index].isLiked === false) {\r\n                _main_js__WEBPACK_IMPORTED_MODULE_0__.comments[index].isLiked = true;\r\n                _main_js__WEBPACK_IMPORTED_MODULE_0__.comments[index].likes++;\r\n            }\r\n            else {\r\n                _main_js__WEBPACK_IMPORTED_MODULE_0__.comments[index].isLiked = false;\r\n                _main_js__WEBPACK_IMPORTED_MODULE_0__.comments[index].likes--;\r\n            }\r\n            event.stopPropagation();\r\n            (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_1__.renderComments)({ comments: _main_js__WEBPACK_IMPORTED_MODULE_0__.comments });\r\n        });\r\n    };\r\n};\r\n\r\n\r\n\r\nconst initRepostCommentElements = () => {\r\n    const commentInputElement = document.getElementById('comment-input');\r\n    const repostCommentElements = document.querySelectorAll(\".comment-body\");\r\n    for (const repostCommentElement of repostCommentElements) {\r\n        repostCommentElement.addEventListener('click', () => {\r\n            const index = repostCommentElement.dataset.index;\r\n            commentInputElement.value = 'QUOTE_BEGIN' + _main_js__WEBPACK_IMPORTED_MODULE_0__.comments[index].name + \":\" + \"\\n\" + _main_js__WEBPACK_IMPORTED_MODULE_0__.comments[index].text + 'QUOTE_END';\r\n        });\r\n    };\r\n};\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/listeners.js?");

/***/ }),

/***/ "./modules/renderComments.js":
/*!***********************************!*\
  !*** ./modules/renderComments.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderComments: () => (/* binding */ renderComments),\n/* harmony export */   renderForm: () => (/* binding */ renderForm)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main.js */ \"./main.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./modules/api.js\");\n/* harmony import */ var _listeners_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listeners.js */ \"./modules/listeners.js\");\n/* harmony import */ var _renderLogin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderLogin.js */ \"./modules/renderLogin.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst renderComments = ({ comments }) => {\r\n\r\n  const container = document.querySelector(\".comments\");\r\n  const commentsHtml = comments.map((comment, index) => {\r\n    return `    \r\n    <li class=\"comment\">\r\n    <div class=\"comment-header\">\r\n        <div>${comment.name}</div>\r\n        <div>${comment.date}</div>\r\n    </div>\r\n    <div class=\"comment-body\" data-index=\"${index}\">    \r\n        <div class=\"comment-text\">\r\n        ${comment.text.replaceAll(\"QUOTE_BEGIN\", \"<div class='quote'>\").replaceAll(\"QUOTE_END\", \"</div>\")}\r\n        </div>\r\n    </div>\r\n    <div class=\"comment-footer\">\r\n        <div class=\"likes\">\r\n            <span class=\"likes-counter\">${comment.likes}</span>\r\n            <button data-index=\"${index}\" class=\"like-button ${comments[index].isLiked ? \"-active-like\" : \"\"}\"></button>\r\n    </div>\r\n    </div >\r\n    </li > \r\n    `\r\n  }).join(\"\");\r\n\r\n  container.innerHTML = commentsHtml;\r\n\r\n  if (_api_js__WEBPACK_IMPORTED_MODULE_1__.user?.token) {\r\n\r\n  (0,_listeners_js__WEBPACK_IMPORTED_MODULE_2__.initLikeComments)();\r\n\r\n  (0,_listeners_js__WEBPACK_IMPORTED_MODULE_2__.initRepostCommentElements)();\r\n\r\n  }\r\n\r\n};\r\n\r\nfunction renderForm() {\r\n\r\n  const container = document.querySelector(\".form\");\r\n      \r\n  const addForm = `\r\n    <div class=\"add-form\">\r\n    <input type=\"text\" class=\"add-form-name\" value=\"${_api_js__WEBPACK_IMPORTED_MODULE_1__.user ? _api_js__WEBPACK_IMPORTED_MODULE_1__.user.name.replaceAll(\"&\", \"&amp;\").replaceAll(\">\", \"&gt;\").replaceAll(\"<\", \"&lt;\").replaceAll('\"', \"&quot;\") : \"\"}\" readonly placeholder=\"Введите ваше имя\" id=\"name-input\">\r\n    <textarea type=\"textarea\" class=\"add-form-text\" placeholder=\"Введите ваш коментарий\" rows=\"4\"\r\n      id=\"comment-input\"></textarea>\r\n      <div class=\"add-form-row\">\r\n      <button class=\"add-form-button\" id=\"button-write\">Написать</button>\r\n      </div>  \r\n    </div>\r\n    `;\r\n\r\n  const textAuth = `\r\n    <div class=\"authorizationRequest\">Чтобы добавить комментарий, <button id=\"authorize-button\" class=\"authorize-button\">авторизуйтесь</button></div>\r\n    `;\r\n\r\n  if (_api_js__WEBPACK_IMPORTED_MODULE_1__.user?.token) {\r\n\r\n      container.innerHTML = addForm;\r\n\r\n      const buttonElement = document.getElementById('button-write');\r\n\r\n      buttonElement.addEventListener(\"click\", postComments);\r\n\r\n    } else {    \r\n\r\n      container.innerHTML = textAuth;\r\n\r\n      const authorizeButtonElement = document.getElementById(\"authorize-button\");\r\n\r\n      authorizeButtonElement.addEventListener(\"click\", () => {\r\n        (0,_renderLogin_js__WEBPACK_IMPORTED_MODULE_3__.renderLogin)()\r\n      });\r\n    }    \r\n  }\r\n\r\n  const postComments = () => {\r\n\r\n      const nameInputElement = document.getElementById('name-input');\r\n      const commentInputElement = document.getElementById('comment-input');\r\n\r\n      const buttonElement = document.getElementById('button-write');\r\n\r\n      nameInputElement.classList.remove('error');\r\n      commentInputElement.classList.remove('error');\r\n\r\n      if (nameInputElement.value.trim() === \"\") {\r\n        nameInputElement.classList.add('error');\r\n        return;\r\n      } else if (commentInputElement.value.trim() === \"\") {\r\n        commentInputElement.classList.add('error');\r\n        return;\r\n      }\r\n\r\n      buttonElement.disabled = true;\r\n      buttonElement.textContent = 'Комментарий загружается...';\r\n\r\n      (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.postComment)({\r\n        name: nameInputElement.value.replaceAll(\"&\", \"&amp;\").replaceAll(\">\", \"&gt;\").replaceAll(\"<\", \"&lt;\").replaceAll('\"', \"&quot;\"),\r\n        text: commentInputElement.value.replaceAll(\"&\", \"&amp;\").replaceAll(\">\", \"&gt;\").replaceAll(\"<\", \"&lt;\").replaceAll('\"', \"&quot;\"),\r\n      }).then(() => {\r\n        return (0,_main_js__WEBPACK_IMPORTED_MODULE_0__.fetchAndRenderComments)();\r\n      }).then(() => {\r\n        buttonElement.disabled = false;\r\n        buttonElement.textContent = 'Написать';\r\n        commentInputElement.value = \"\";\r\n      }).catch((error) => {\r\n        buttonElement.disabled = false;\r\n        buttonElement.textContent = 'Написать';\r\n        if (error.message === 'Имя / коммент содержат менее 3 символов') {\r\n          alert('Поля \"имя\" / \"комментарий\" должны содержать хотя бы 3 символа');\r\n          return;\r\n        } else if (error.message === 'Сервер недоступен') {\r\n          postComments();\r\n        } else {\r\n          alert('Кажется, интернет сломался, попробуйте позже');\r\n        }\r\n        console.log(error);\r\n      });\r\n\r\n  };\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/renderComments.js?");

/***/ }),

/***/ "./modules/renderLogin.js":
/*!********************************!*\
  !*** ./modules/renderLogin.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLogin: () => (/* binding */ renderLogin)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main.js */ \"./main.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./modules/api.js\");\n/* harmony import */ var _renderRegistration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderRegistration.js */ \"./modules/renderRegistration.js\");\n\r\n\r\n\r\n\r\nconst renderLogin = () => {\r\n\r\n    const appElement = document.getElementById(\"container\");\r\n\r\n    const loginHtml = `\r\n    <div class=\"container\">\r\n        <div class=\"add-form\">\r\n            <h3 class=\"form-title\">Форма входа</h3>\r\n            <input type=\"text\" id=\"login-input\" class=\"add-form-text\" placeholder=\"Логин\" />\r\n            <input type=\"text\" id=\"password-input\" class=\"add-form-text\" placeholder=\"Пароль\" />\r\n            <button class=\"add-form-button\" id=\"login-button\">Войти</button>\r\n            <button class=\"link\" id=\"link-register\">Зарегистрироваться</button>\r\n        </div>\r\n        <br />\r\n    </div>\r\n    `;\r\n\r\n    appElement.innerHTML = loginHtml;\r\n\r\n    const loginButtonElement = document.getElementById(\"login-button\");\r\n    const loginInputElement = document.getElementById(\"login-input\");\r\n    const passwordInputElement = document.getElementById(\"password-input\");\r\n    const linkRegisterElement = document.getElementById(\"link-register\"); \r\n    \r\n    \r\n\r\n    linkRegisterElement.addEventListener(\"click\", () => {       \r\n        (0,_renderRegistration_js__WEBPACK_IMPORTED_MODULE_2__.renderRegistration)();      \r\n    });\r\n\r\n    loginButtonElement.addEventListener(\"click\", () => {\r\n\r\n        loginInputElement.classList.remove('error');\r\n        passwordInputElement.classList.remove('error');\r\n\r\n        if (loginInputElement.value.trim() === \"\" && passwordInputElement.value.trim() === \"\") {\r\n            loginInputElement.classList.add('error');\r\n            passwordInputElement.classList.add('error');\r\n            return;\r\n        } else if (loginInputElement.value.trim() === \"\") {\r\n            loginInputElement.classList.add('error');\r\n            return;\r\n        } else if (passwordInputElement.value.trim() === \"\") {\r\n            passwordInputElement.classList.add('error');\r\n            return;\r\n        }\r\n\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.login)({\r\n            login: loginInputElement.value.replaceAll(\"&\", \"&amp;\").replaceAll(\">\", \"&gt;\").replaceAll(\"<\", \"&lt;\").replaceAll('\"', \"&quot;\"),\r\n            password: passwordInputElement.value.replaceAll(\"&\", \"&amp;\").replaceAll(\">\", \"&gt;\").replaceAll(\"<\", \"&lt;\").replaceAll('\"', \"&quot;\"),\r\n\r\n        }).then((responseData) => {\r\n            localStorage.setItem(\"user\", JSON.stringify(responseData.user));\r\n            (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.setUser)(responseData.user);\r\n        }).then(() => { \r\n            (0,_main_js__WEBPACK_IMPORTED_MODULE_0__.renderMainPage)();\r\n        }).catch((error) => {\r\n            alert(error.message);\r\n            console.log(error);\r\n        })\r\n    });\r\n};\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/renderLogin.js?");

/***/ }),

/***/ "./modules/renderRegistration.js":
/*!***************************************!*\
  !*** ./modules/renderRegistration.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderRegistration: () => (/* binding */ renderRegistration)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./modules/api.js\");\n/* harmony import */ var _renderLogin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderLogin.js */ \"./modules/renderLogin.js\");\n\r\n\r\n\r\nconst renderRegistration = () => {\r\n\r\n    const appElement = document.getElementById(\"container\");\r\n\r\n    const registerForm = `\r\n<div class=\"container\">\r\n    <div class=\"add-form\">\r\n        <h3 class=\"form-title\">Форма регистрации</h3>\r\n        <input type=\"text\" id=\"name-input\" class=\"add-form-text\" placeholder=\"Введите имя\" />\r\n        <input type=\"text\" id=\"login-input\" class=\"add-form-text\" placeholder=\"Введите логин\" />\r\n        <input type=\"text\" id=\"password-input\" class=\"add-form-text\" placeholder=\"Введите пароль\" />\r\n        <button class=\"add-form-button\" id=\"register-button\">Зарегистрироваться</button>\r\n        <button class=\"link\" id=\"link-enter\">Войти</button>\r\n    </div>\r\n    <br />\r\n</div>    \r\n`;\r\n    appElement.innerHTML = registerForm;\r\n\r\n    const linkEnterElement = document.getElementById(\"link-enter\");\r\n    linkEnterElement.addEventListener(\"click\", () => {\r\n        (0,_renderLogin_js__WEBPACK_IMPORTED_MODULE_1__.renderLogin)();        \r\n    })\r\n\r\n    const nameInputElement = document.getElementById(\"name-input\");\r\n    const loginInputElement = document.getElementById(\"login-input\");\r\n    const passwordInputElement = document.getElementById(\"password-input\");\r\n\r\n    const registerButtonElement = document.getElementById(\"register-button\");\r\n    registerButtonElement.addEventListener(\"click\", () => {\r\n\r\n        nameInputElement.classList.remove('error');\r\n        loginInputElement.classList.remove('error');        \r\n        passwordInputElement.classList.remove('error');\r\n\r\n        if (nameInputElement.value.trim() === \"\" && loginInputElement.value.trim() === \"\" && passwordInputElement.value.trim() === \"\") {\r\n            nameInputElement.classList.add('error');\r\n            loginInputElement.classList.add('error');\r\n            passwordInputElement.classList.add('error');\r\n            return;\r\n        } else if (nameInputElement.value.trim() === \"\") {\r\n            nameInputElement.classList.add('error');\r\n            return;\r\n        } else if (loginInputElement.value.trim() === \"\") {\r\n            loginInputElement.classList.add('error');\r\n            return;\r\n        } else if (passwordInputElement.value.trim() === \"\") {\r\n            passwordInputElement.classList.add('error');\r\n            return;\r\n        }\r\n\r\n\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.registration) ({\r\n            name: nameInputElement.value,\r\n            login: loginInputElement.value,\r\n            password: passwordInputElement.value,\r\n        }).then((responseData) => {\r\n            (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.setUser)(responseData.user);\r\n        }).then(() => {\r\n            (0,_renderLogin_js__WEBPACK_IMPORTED_MODULE_1__.renderLogin)();\r\n        }).catch((error) => {\r\n            if (error.message === 'Пользователь с таким логином уже существует.') {\r\n                alert(error.message);\r\n                console.log(error);\r\n            } else {\r\n                alert('Кажется, интернет сломался, попробуйте позже');\r\n            }            \r\n        })\r\n    });\r\n};\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/renderRegistration.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;