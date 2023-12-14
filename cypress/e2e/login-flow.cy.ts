describe('template spec', () => {
  it('should successfully complete the login flow', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login');

    // Wait for the complete page to appear
    // cy.wait(1000);

    // Check if the login stepper is rendered
    cy.get('.MuiStepper-root').should('exist');

    // check if the stepper is on it's first step
    cy.get('input[name="email"]').should('exist');

    // Type email and password
    cy.get('input[name="email"]').type('zain.mustafaaa@gmail.com');
    cy.get('input[name="password"]').type('Pass123456789@');

    // Submit the login form
    cy.get('button[type="submit"]').click();

    // Wait for the OTP verification step to appear
    cy.wait(6000);

    // check if the stepper is on it's second step
    cy.get(`[data-testid="verification-character-0"] input`).should('exist');

    // Type 4 in all input boxes
    for (let i = 1; i <= 6; i++) {
      cy.get(`[data-testid="verification-character-${i - 1}"] input`).type('4');
    }

    // Wait for the verification to complete (adjust the timeout if needed)
    cy.wait(1000);

    // Check if the user is navigated to the /dashboard page
    cy.url().should('include', '/dashboard');
  });
});
