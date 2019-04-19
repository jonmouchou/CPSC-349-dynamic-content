(window => {
  'use strict';

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
      json.forEach(element => {
        $('body').append(
          `
          <article>
            <h2 data-posts="title">${element.title}</h2>
            <p data-posts="body">
              ${element.body.replace(/(?:\r\n|\r|\n)/g, '<br>')}
            </p>
            <button data-posts="id" value="${element.id}" type="button">Show comments</button>
            <section class="comments" id="comments-${element.id}" hidden>
              <h3>Comments</h3>
            </section>
          </article>
        `
        );
      });
    })
    .then(() => {
      const BUTTON_SELECTOR = '[data-posts="id"]';
      let buttons = document.querySelectorAll(BUTTON_SELECTOR);

      buttons.forEach(button => {
        'use strict';

        let sectionSelector = `#comments-${button.value}`;
        let commentSection = document.querySelector(sectionSelector);

        button.addEventListener('click', event => {
          if (commentSection.hidden) {
            if (commentSection.childElementCount === 1) {
              fetch(`https://jsonplaceholder.typicode.com/comments?postId=${button.value}`)
                .then(response => response.json())
                .then(json => {
                  json.forEach(element => {
                    $(sectionSelector).append(
                      `
                      <p data-comments="body">
                        ${element.body.replace(/(?:\r\n|\r|\n)/g, '<br>')}
                      </p>
                      <address data-comments="name">
                        <a data-comments="email" href="mailto:${element.email}">${element.name}</a>
                      </address>
                      `
                    );
                  });
                })
                .catch(error => console.error(error));
            }
            commentSection.hidden = false;
            button.textContent = 'Hide comments';
          } else {
            commentSection.hidden = true;
            button.textContent = 'Show comments';
          }

          event.preventDefault();
        });
      });
    })
    .catch(error => console.error(error));
})(window);
