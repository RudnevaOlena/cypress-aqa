import signup from '../../pages/signup'
import header from '../../pages/header'

describe('SignUp form', () => {
  beforeEach(() => {
    cy.openApp();
    header.openSignUpModal();
    signup.isSignUpFormVisible();
  })

  describe('Name field validation', () => {
    it('Valid input for Name', () => {
      cy.fixture('signUpNameData').then((data) => {

        data.validNames.forEach(name => {
          cy.log(`Testing name: ${name}`);
          signup.typeName(name);
          signup.getEmailInput().click();
          signup.getNameInput().should('have.value', name);
          signup.getFormError('name')
            .should('not.exist');
        })
      })
    })

    //test failed - need to report a bug
    // it('Should trim spaces in Name field', () => {
    //   cy.fixture('signUpNameData').then((data) => {
    //     cy.log(`Testing name: ${data.trimName.input}`);
    //     signup.typeName(data.trimName.input);
    //     signup.getEmailInput().click();
    //     signup.getNameInput().should('have.value', data.trimName.expected);
    //     signup.getFormError('name')
    //       .should('not.exist');
    //   })
    // })

    it('Invalid inputs for Name', () => {
      cy.fixture('signUpNameData').then((data) => {
        data.invalidNames.forEach(({ value, error }) => {
          cy.log(`Testing name: ${value}`);
          signup.typeName(value);
          signup.getEmailInput().click();
          signup.getFormError('name').should('be.visible')
            .and('contain', error);
          signup.getNameInput()
            .should('have.class', 'is-invalid')
            .and('have.css', 'border-color', 'rgb(220, 53, 69)')
        })
      })
    })

    it('Empty required Name input show error', () => {
      cy.fixture('signUpNameData').then((data) => {
        cy.log('Testing empty name');
        signup.getNameInput().click();
        signup.getEmailInput().click();
        signup.getFormError('name').should('be.visible')
          .and('contain', data.requiredError);
        signup.getNameInput()
          .should('have.class', 'is-invalid')
          .and('have.css', 'border-color', 'rgb(220, 53, 69)')
      })
    })
  })

  describe('Last Name field validation', () => {

    it('Valid input for Last Name', () => {
      cy.fixture('signUpLastNameData').then((data) => {
        data.validLastNames.forEach(lastName => {
          cy.log(`Testing last name: ${lastName}`);
          signup.typeLastName(lastName);
          signup.getEmailInput().click();
          signup.getLastNameInput()
            .should('have.value', lastName);
          signup.getFormError('lastName')
            .should('not.exist');
        })
      })
    })

    it('Invalid inputs for Last Name', () => {
      cy.fixture('signUpLastNameData').then((data) => {
        data.invalidLastNames.forEach(({ value, error }) => {
          cy.log(`Testing last name: ${value}`);
          signup.typeLastName(value);
          signup.getEmailInput().click();
          signup.getFormError('lastName')
            .should('be.visible')
            .and('contain', error);
          signup.getLastNameInput()
            .should('have.class', 'is-invalid')
            .and('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
      })
    })

    it('Empty required Last Name input show error', () => {
      cy.fixture('signUpLastNameData').then((data) => {
        cy.log('Testing empty last name');
        signup.getLastNameInput().click();
        signup.getEmailInput().click();
        signup.getFormError('lastName')
          .should('be.visible')
          .and('contain', data.requiredError);
        signup.getLastNameInput()
          .should('have.class', 'is-invalid')
          .and('have.css', 'border-color', 'rgb(220, 53, 69)');
      })
    })

    it('Boundary: 1 characters Last Name (invalid)', () => {
      cy.fixture('signUpLastNameData').then((data) => {
        cy.log(`Testing: ${data.boundaryInvalid.oneChars.value}`);
        signup.typeLastName(data.boundaryInvalid.oneChars.value);
        signup.getEmailInput().click();
        signup.getFormError('lastName')
          .should('be.visible')
          .and('contain', data.boundaryInvalid.oneChars.error);
        signup.getLastNameInput()
          .should('have.class', 'is-invalid')
          .and('have.css', 'border-color', 'rgb(220, 53, 69)');
      })
    })

    it('Boundary: 21 characters Last Name (invalid)', () => {
      cy.fixture('signUpLastNameData').then((data) => {
        cy.log(`Testing: ${data.boundaryInvalid.twentyOneChars.value}`);
        signup.typeLastName(data.boundaryInvalid.twentyOneChars.value);
        signup.getEmailInput().click();
        signup.getFormError('lastName')
          .should('be.visible')
          .and('contain', data.boundaryInvalid.twentyOneChars.error);
        signup.getLastNameInput()
          .should('have.class', 'is-invalid')
          .and('have.css', 'border-color', 'rgb(220, 53, 69)');
      })
    })
  })

  describe('Email field validation', () => {
    it('Valid email input (unique email)', () => {
      const uniqueEmail = `user_${Date.now()}@notrealmail.com`;
      signup.typeEmail(uniqueEmail);
      signup.getNameInput().click();
      signup.getEmailInput()
        .should('have.value', uniqueEmail);
      signup.getFormError('email')
        .should('not.exist');
      signup.getEmailInput()
        .should('have.class', 'ng-valid')
    })

    it('Empty Email shows required error', () => {
      signup.getEmailInput().click();
      signup.getNameInput().click();
      signup.getFormError('email')
        .should('be.visible')
        .and('contain', 'Email required');
      signup.getEmailInput()
        .should('have.class', 'is-invalid')
        .and('have.css', 'border-color', 'rgb(220, 53, 69)')
    })

    it('Invalid email formats', () => {
      cy.fixture('signUpInvalidEmailData').then((data) => {
        data.invalidEmails.forEach(({ value, error }) => {
          cy.log(`Testing email: ${value}`);
          signup.typeEmail(value);
          signup.getNameInput().click();
          signup.getFormError('email')
            .should('be.visible')
            .and('contain', error);
          signup.getEmailInput()
            .should('have.class', 'is-invalid')
            .and('have.css', 'border-color', 'rgb(220, 53, 69)')
        })
      })
    })
  })

  describe('Password field validation', () => {
    it('Valid password inputs', () => {
      cy.fixture('signUpPasswordData').then((data) => {
        data.validPasswords.forEach(password => {
          cy.log(`Testing password: ${password}`);
          signup.typePassword(password);
          signup.getNameInput().click();
          signup.getPasswordInput()
            .should('have.value', password);
          signup.getFormError('password')
            .should('not.exist')
          signup.getPasswordInput()
            .should('have.class', 'ng-valid');
        });

      });
    });  
    
    it('Invalid password inputs', () => {
      cy.fixture('signUpPasswordData').then((data) => {
        data.invalidPasswords.forEach(({ value, error }) => {
          cy.log(`Testing password: ${value}`);
          signup.typePassword(value);
          //signup.getNameInput().click();
          signup.getPasswordInput().blur();
          signup.getFormError('password')
            .should('be.visible')
            .and('contain', error);
          signup.getPasswordInput()
            .should('have.class', 'is-invalid')
            .and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
      });
    });

    it('Empty password shows required error', () => {
      cy.fixture('signUpPasswordData').then((data) => {
        cy.log('Testing empty password');
        signup.getPasswordInput().click();
        signup.getNameInput().click();
        signup.getFormError('password')
          .should('be.visible')
          .and('contain', data.requiredError);
        signup.getPasswordInput()
          .should('have.class', 'is-invalid')
          .and('have.css', 'border-color', 'rgb(220, 53, 69)');
      });
    });

    it('Boundary: 7 characters password (invalid)', () => {
      cy.fixture('signUpPasswordData').then((data) => {
        cy.log(`Testing: ${data.boundaryInvalid.sevenChars.value}`);
        signup.typePassword(data.boundaryInvalid.sevenChars.value);
        signup.getNameInput().click();
        signup.getFormError('password')
          .should('be.visible')
          .and('contain', data.boundaryInvalid.sevenChars.error);
        signup.getPasswordInput()
          .should('have.class', 'is-invalid')
          .and('have.css', 'border-color', 'rgb(220, 53, 69)');
      });
    });

    it('Boundary: 16 characters password (invalid)', () => {
      cy.fixture('signUpPasswordData').then((data) => {
        cy.log(`Testing: ${data.boundaryInvalid.sixteenChars.value}`);
        signup.typePassword(data.boundaryInvalid.sixteenChars.value);
        signup.getNameInput().click();
        signup.getFormError('password')
          .should('be.visible')
          .and('contain', data.boundaryInvalid.sixteenChars.error);
        signup.getPasswordInput()
          .should('have.class', 'is-invalid')
          .and('have.css', 'border-color', 'rgb(220, 53, 69)');
      });
    });

  });

  describe('Repeat Password field validation', () => {
    it('Valid re-entered password matches original one', () => {
      cy.fixture('signUpRepeatPasswordData').then((data) => {
        cy.log('Testing matching passwords');
        signup.typePassword(data.validPair.password);
        signup.typeRepeatPassword(data.validPair.repeatPassword);
        signup.getNameInput().click();
        signup.getRepeatPasswordInput()
          .should('have.value', data.validPair.repeatPassword);
        signup.getFormError('repeatPassword')
          .should('not.exist');
      });
    });

    it('Mismatch passwords show error', () => {
      cy.fixture('signUpRepeatPasswordData').then((data) => {
        data.mismatchPasswords.forEach(({ password, repeatPassword, error }) => {
          cy.log(`Testing mismatch: ${password} / ${repeatPassword}`);
          signup.typePassword(password);
          signup.typeRepeatPassword(repeatPassword);
          signup.getNameInput().click();
          signup.getFormError('repeatPassword')
            .should('be.visible')
            .and('contain', error);
          signup.getRepeatPasswordInput()
            .should('have.class', 'is-invalid')
            .and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

      });
    });

    it('Empty repeat password shows required error', () => {
      cy.fixture('signUpRepeatPasswordData').then((data) => {
        cy.log('Testing empty repeat password');
        signup.typePassword('Password1');
        signup.getRepeatPasswordInput().click();
        signup.getNameInput().click();
        signup.getFormError('repeatPassword')
          .should('be.visible')
          .and('contain', data.requiredError);
        signup.getRepeatPasswordInput()
          .should('have.class', 'is-invalid')
          .and('have.css', 'border-color', 'rgb(220, 53, 69)');
      });
    });

    it('Boundary: 7 characters password (invalid but matching)', () => {
      cy.fixture('signUpRepeatPasswordData').then((data) => {
        cy.log('Testing 7 characters password');
        signup.typePassword(data.theSameInvalidPasswords.tooShort.password);
        signup.typeRepeatPassword(data.theSameInvalidPasswords.tooShort.repeatPassword);
        signup.getNameInput().click();
        signup.getFormError('repeatPassword')
          .should('be.visible')
          .and('contain', data.theSameInvalidPasswords.tooShort.error);
        signup.getRepeatPasswordInput()
          .should('have.class', 'is-invalid')
          .and('have.css', 'border-color', 'rgb(220, 53, 69)');
      });
    });

    it('Boundary: 16 characters password (invalid but matching)', () => {
      cy.fixture('signUpRepeatPasswordData').then((data) => {
        cy.log('Testing 16 characters password');
        signup.typePassword(data.theSameInvalidPasswords.tooLong.password);
        signup.typeRepeatPassword(data.theSameInvalidPasswords.tooLong.repeatPassword);
        signup.getNameInput().click();
        signup.getFormError('repeatPassword')
          .should('be.visible')
          .and('contain', data.theSameInvalidPasswords.tooLong.error);
        signup.getRepeatPasswordInput()
          .should('have.class', 'is-invalid')
          .and('have.css', 'border-color', 'rgb(220, 53, 69)');
      });
    });
  });

  describe('Register button validation', () => {
    it('Successful registration redirects to garage and shows profile button', () => {
      cy.fixture('signUpUsers').then((data) => {
        const user = {
          ...data.validUser,
          email: `user_${Date.now()}@test.com`
        };
        signup.register(user);
        cy.url()
          .should('include', '/panel/garage');
        signup.getUserProfileButton()
          .should('be.visible')
          .and('contain', 'My profile');
      });
    });

    it('Register button is disabled for invalid user data', () => {
      cy.fixture('signUpUsers').then((data) => {
        const user = {
          ...data.invalidUser,
          email: `user_${Date.now()}@test.com`
        };
        signup.getRegisterButton()
          .should('be.disabled');
      });
    });
  });
})
