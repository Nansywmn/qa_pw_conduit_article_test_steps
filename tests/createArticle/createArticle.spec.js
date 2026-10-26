import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

test.describe('Article creation', () => {
  let homePage;
  let createArticlePage;

  test.beforeEach(async ({ page }) => {
    const signUpPage = new SignUpPage(page);
    homePage = new HomePage(page);
    createArticlePage = new CreateArticlePage(page);

    const user = {
      username: `${faker.person.firstName()}_${faker.person.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await signUpPage.open();
    await signUpPage.fillUsernameField(user.username);
    await signUpPage.fillEmailField(user.email);
    await signUpPage.fillPasswordField(user.password);
    await signUpPage.clickSignUpButton();
    await homePage.assertYourFeedTabIsVisible();
  });
  const title = faker.lorem.sentence();
  const description = faker.lorem.sentence();
  const body = faker.lorem.paragraphs(3);
  const tag = faker.lorem.word();

  test('Create an article with required and optional fields', async () => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillField('articleTitleField', title);
    await createArticlePage.fillField('articleDescriptionField', description);
    await createArticlePage.fillField('articleBodyTextField', body);
    await createArticlePage.fillTagField(tag);
    await createArticlePage.clickPublishArticleButton();
  });

  test('Create an article without description', async () => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillField('articleTitleField', title);
    await createArticlePage.fillField('articleBodyTextField', body);
    await createArticlePage.fillTagField(tag);
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertErrorMessageContainsText(
      'Article description cannot be empty',
    );
  });

  test('Create an article without text', async () => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillField('articleTitleField', title);
    await createArticlePage.fillField('articleDescriptionField', description);
    await createArticlePage.fillTagField(tag);
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage.assertErrorMessageContainsText(
      'Article body cannot be empty',
    );
  });

  test('Create an article without tag', async () => {
    await homePage.clickNewArticleLink();
    await createArticlePage.fillField('articleTitleField', title);
    await createArticlePage.fillField('articleDescriptionField', description);
    await createArticlePage.fillField('articleBodyTextField', body);
    await createArticlePage.clickPublishArticleButton();
  });
});
