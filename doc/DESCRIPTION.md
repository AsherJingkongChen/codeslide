# Description written in English
CodeSlide CLI is a command-line interface application built using Rust and TypeScript (ES6) that generates HTML slides from a given schema in JSON format.

The application utilizes a template engine, module bundler, and SerDe for serialization and deserialization.

The Askama template engine, which is similar to Jinja, is used for HTML templating.

Webpack is used as the module bundler to bundle and optimize the application's JavaScript and CSS files.

The application also uses SerDe for serialization and deserialization of data structures.

To provide syntax highlighting for the code snippets in the slides, Highlight.js is used as the syntax highlighter.

Highlight.js is a popular syntax highlighter that supports over 190 programming languages (I picked about 40 languages), has over 240 styles and has a small footprint.

The generated slides can be viewed on any web browser, making it easy to share presentations with others.

The project is still a work in progress, and only the CLI app is currently available for end-users.

However, the application's modular architecture makes it easy to add new features and extend its functionality in the future.

# 中文簡介
CodeSlide CLI 是一個命令行界面應用程序，使用 Rust 和 TypeScript (ES6) 構建，可從給定的 JSON 格式模式生成 HTML 幻燈片。

該應用程序利用模板引擎、模塊捆綁器和 SerDe 進行序列化和反序列化、
類似於 Jinja 的 Askama 模板引擎用於 HTML 模板。

Webpack 被用作模塊捆綁器來捆綁和優化應用程序的 JavaScript 和 CSS 文件。

為了為幻燈片中的代碼片段提供語法高亮顯示，使用了 Highlight.js 作為語法高亮顯示。

Highlight.js 是一種流行的語法高亮器，支持超過 190 種編程語言（我選擇了大約 40 種語言），具有超過 240 種樣式並且佔用空間小。

生成的幻燈片可以在任何 Web 瀏覽器上查看，從而可以輕鬆地與他人共享演示文稿。

該項目仍在進行中，目前只有 CLI 應用程序可供最終用戶使用。

然而，該應用程序的模塊化架構使得在未來添加新功能和擴展其功能變得容易。

# Descripción escrita en español
CodeSlide CLI es una aplicación de interfaz de línea de comandos construida usando Rust y TypeScript (ES6) que genera diapositivas HTML a partir de un esquema dado en formato JSON.

La aplicación utiliza un motor de plantillas, un paquete de módulos y SerDe para la serialización y deserialización.

Se utiliza el motor de plantillas Askama, similar a Jinja, para la creación de plantillas HTML.

Webpack se utiliza como paquete de módulos para empaquetar y optimizar los archivos JavaScript y CSS de la aplicación.

La aplicación también utiliza SerDe para la serialización y deserialización de estructuras de datos.

Para proporcionar el resaltado de sintaxis para los fragmentos de código en las diapositivas, se utiliza Highlight.js como resaltador de sintaxis.

Highlight.js es un resaltador de sintaxis popular que admite más de 190 lenguajes de programación (he elegido alrededor de 40 lenguajes), tiene más de 240 estilos y ocupa poco espacio.

Las diapositivas generadas se pueden ver en cualquier navegador web, lo que facilita la compartición de presentaciones con otros.

El proyecto sigue en desarrollo y actualmente solo está disponible la aplicación CLI para los usuarios finales.

Sin embargo, la arquitectura modular de la aplicación hace que sea fácil agregar nuevas características y extender su funcionalidad en el futuro.

# Descriptif rédigé en français
CodeSlide CLI est une application d'interface de ligne de commande construite à l'aide de Rust et TypeScript (ES6) qui génère des diapositives HTML à partir d'un schéma donné au format JSON.

L'application utilise un moteur de modèle, un groupeur de modules et SerDe pour la sérialisation et la désérialisation.

Le moteur de modèle Askama, similaire à Jinja, est utilisé pour la création de modèles HTML.

Webpack est utilisé comme groupeur de modules pour regrouper et optimiser les fichiers JavaScript et CSS de l'application.

L'application utilise également SerDe pour la sérialisation et la désérialisation des structures de données.

Pour fournir la coloration syntaxique des extraits de code dans les diapositives, Highlight.js est utilisé comme surligneur de syntaxe.

Highlight.js est un surligneur de syntaxe populaire qui prend en charge plus de 190 langages de programmation (j'ai choisi environ 40 langues), a plus de 240 styles et a une petite empreinte.

Les diapositives générées peuvent être visualisées sur n'importe quel navigateur Web, ce qui facilite le partage de présentations avec d'autres.

Le projet est toujours en cours et seule l'application CLI est actuellement disponible pour les utilisateurs finaux.

Cependant, l'architecture modulaire de l'application facilite l'ajout de nouvelles fonctionnalités et l'extension de ses fonctionnalités à l'avenir.