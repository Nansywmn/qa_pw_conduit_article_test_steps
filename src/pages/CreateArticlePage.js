import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.articleTitleField = page.getByPlaceholder('Article Title');
    this.articleDescriptionField = page.getByPlaceholder(
      "What's this article about?",
    );
    this.articleBodyTextField = page.getByPlaceholder(
      'Write your article (in markdown)',
    );
    this.articleTagField = page.getByPlaceholder('Enter tags');
    
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async fillField(field, value) {
    await test.step(`Fill ${field} field`, async () => {
      await this[field].fill(value);
    });
  }

  async fillTagField(value) {
    await test.step(`Fill tag field`, async () => {
      await this.articleTagField.fill(value);
      await this.page.keyboard.press('Enter');
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
