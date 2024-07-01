import { $ } from '@wdio/globals'
import Page from './page.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/**
 * sub page containing specific selectors and methods for a specific page
 */
class AuthActions extends Page {
    /**
     * define selectors using getter methods
     */
    
    get username () {
        return $('#user-name');
    }
   
    get password () {
        return $('#password');
    }

    get btnSubmit () {
        return $('[value="Login"]');
    }

    get logoutButton (){
        return $('button[class="muted-button"]');
    }

    get signInError (){
        return $('[data-test="error"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.btnSubmit.click();
        await expect(browser).toHaveUrl(`https://www.saucedemo.com/inventory.html`);
    }

    async logout (){
        await this.logoutButton.click()
    }

    async authError(username,password){
        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.btnSubmit.click();
        await expect (this.signInError).toHaveText(expect.stringMatching("Epic sadface: Username and password do not match any user in this service"));
        await expect(browser).toHaveUrl(`https://www.saucedemo.com/`);
    }

    async accessError(){
        await browser.url('https://www.saucedemo.com/inventory.html');
        await expect (this.signInError).toHaveText(expect.stringMatching("Epic sadface: You can only access '/inventory.html' when you are logged in."));
    }

    async accountLockedError(username,password){
        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.btnSubmit.click();
        await expect (this.signInError).toHaveText(expect.stringMatching("Epic sadface: Sorry, this user has been locked out."));
        await expect(browser).toHaveUrl(`https://www.saucedemo.com/`);
    }

    async noUsername(password){
        await this.password.setValue(password);
        await this.btnSubmit.click();
        await expect (this.signInError).toHaveText(expect.stringMatching("Epic sadface: Username is required"));
        await expect(browser).toHaveUrl(`https://www.saucedemo.com/`);
    }

    async noPassword(username){
        await this.username.setValue(username);
        await this.btnSubmit.click();
        await expect (this.signInError).toHaveText(expect.stringMatching("Epic sadface: Password is required"));
        await expect(browser).toHaveUrl(`https://www.saucedemo.com/`);
    }



    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('login');
    }

    home (){
        return super.home('homepage')
    }
}

export default new AuthActions();
