/// <reference types="cypress" />

// describe('Successful LoginCheck with Original Password', function () {
//     it('Enter valid Email, Password and click Enter', function () {
//         cy.visit('https://www.douglas.de/de/login/')
//         cy.get('.uc-overlay__buttons > .button__primary').click()
//         cy.get('.login__email > .input__inner-wrapper > .input__input').type('testautomationakshat@gmail.com')
//         cy.get('.login__password > div > input').type('DouglasTestAutomation@1')
//         cy.get('.login__button[type="submit"]').click()
//         cy.get('.account-overview-head > .headline-bold').should('have.text', 'Hallo Test Automation,')
//     })
// })

describe('Invalid Login Check', function () {
    it('Invalid Email Check', function () {
        cy.visit('https://www.douglas.de/de/login/')
        cy.get('.uc-overlay__buttons > .button__primary').click()
        cy.get('.login__email > .input__inner-wrapper > .input__input').type('test@gmail.com')
        // cy.get('.login__password > .input__inner-wrapper > .button > .icon > path').click()
        cy.get('.login__password > div > input').type('DouglasTestAutomation@1')
        cy.get('.login__button[type="submit"]').click()
        cy.get('.alert > .google-translate-fallback').should('have.text', 'Falsche Zugangsdaten')
    })

    // it('Invalid Password Check', function () {
    //     cy.get('.login__email > .input__inner-wrapper > .input__input').type('testautomationakshat@gmail.com')
    //     // cy.get('.login__password > .input__inner-wrapper > .button > .icon > path').click()
    //     cy.get('.login__password > div > input').type('testpass@1')
    //     cy.get('.login__button[type="submit"]').click()
    //     cy.get('.alert > .google-translate-fallback').should('have.text', 'Falsche Zugangsdaten')
    // })

    // it('Invalid Email and Invalid Password Check', function () {
    //     cy.get('.login__email > .input__inner-wrapper > .input__input').type('test@gmail.com')
    //     // cy.get('.login__password > .input__inner-wrapper > .button > .icon > path').click()
    //     cy.get('.login__password > div > input').type('testpass@1')
    //     cy.get('.login__button[type="submit"]').click()
    //     cy.get('.alert > .google-translate-fallback').should('have.text', 'Falsche Zugangsdaten')
    // })
})

describe("Setting New Password:", () => {
    it("Click on Forgot Password", function () {
        cy.get('div.login__link').click()
        cy.get('.forgot-password__email > div> input').type('testautomationakshat@gmail.com')
        cy.get('.forgot-password__buttons [type="submit"]').click()
        cy.wait(20000)
    })

    it("Verify Forgot Password email from Douglas", function () {
        // debugger; //Uncomment for debugger to work...
        cy
            .task("gmail:get-messages", {
                options: {
                    from: "service@douglas.de",
                    subject: "Dein neues Passwort für douglas.de",
                    include_body: true,
                }
            })
            .then(emails => {
                cy.writeFile('cypress/fixtures/email-html.html', emails[0].body.html);

                // TODO -- Fetch register link from data fetched from email
                // let registerLink = 'https://douglas.de/resetPassword?apiKey=3_-t-AxoeuhzOrCaDZk_wp_QwxvFYBBXVtz_zAZYfEEZtROiPih82cGJqJcUvVrSrQ&pwrt=tk1..AcbHpxDLJA.z-IKESzr37xNmkOyesW-u01sAK1koswr0dnXXKv1Jgwn5YgGRVPZnNe2wLosHuLA.D6YO0FyuJNxWt2Wb-hSjlds3SCGr5VGVQ76GpH83G-z-42UWumPql6xki5eZQ33EX1zKaotrROk_JcLF1TbTdw.sc3&email=testautomationakshat@gmail.com&langFallback=de'
                // cy.visit(registerLink);
            });
    });
    // it('Enter New Password and verify successful login', function () {
    //     cy.get('.uc-overlay__buttons > .button__primary').click()
    //     cy.get('.new-password__password > div > input').type('newTestPassword@4')
    //     cy.get('.new-password__button[type="submit"]').click()
    //     cy.get('.account-overview-head > .headline-bold').should('have.text', 'Hallo Test Automation,')
    // })
});





function getRegisterLinkFromHtml(html) {
    return html
        .split('a href=')[0]
        .match(/\bhttp:\/\/\S+/)[0]
        .replace('"', '');
}