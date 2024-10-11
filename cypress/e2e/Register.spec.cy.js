describe("User Registration Functionality", () => {
  const registrationData = {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
    password: "Test12345",
    confirmPassword: "Test12345",
  };

  it("should load the registration page", () => {
    cy.visit(`${process.env.VITE_FRONTEND_URL}/register`);
    cy.url().should("eq", `${process.env.VITE_FRONTEND_URL}/register`);
    cy.get("h3").contains("Create New Account").should("exist");
  });

  it("should display a success toast on successful registration", () => {
    cy.intercept("POST", `${process.env.VITE_BACKEND_URL}/api/register`, (req) => {
      req.reply({
        statusCode: 201,
        body: {
          message: "User registered successfully, please confirm your email.",
        },
      });
    }).as("registerUser");

    cy.visit(`${process.env.VITE_FRONTEND_URL}/register`);

    // Filling out the form with debug logs
    cy.get('[name="first_name"]').type(registrationData.firstName).then(($input) => {
      console.log('First Name:', $input.val());
    });
    cy.get('[name="last_name"]').type(registrationData.lastName).then(($input) => {
      console.log('Last Name:', $input.val());
    });
    cy.get('[name="email"]').type(registrationData.email).then(($input) => {
      console.log('Email:', $input.val());
    });
    cy.get('[name="phone"]').type(registrationData.phone).then(($input) => {
      console.log('Phone:', $input.val());
    });
    cy.get('[name="password"]').type(registrationData.password).then(($input) => {
      console.log('Password:', $input.val());
    });
    cy.get('[name="confirmPassword"]').type(registrationData.confirmPassword).then(($input) => {
      console.log('Confirm Password:', $input.val());
    });

    // Submit the form
    cy.get("#register").click();

    // Wait for the intercepted POST request and assert response
    cy.wait("@registerUser", { timeout: 60000 })
      .its("response.statusCode")
      .should("eq", 201);

    // Asserting that the success toast appears
    cy.get(".Toastify__toast--success")
      .should("exist")
      .and(
        "contain",
        "User registered successfully, please confirm your email."
      );
  });

  it("should display an error if email already exists", () => {
    cy.intercept("POST", `${process.env.VITE_BACKEND_URL}/api/register`, (req) => {
      req.reply({
        statusCode: 400,
        body: { message: "Email already exists" },
      });
    }).as("registerUserExists");

    cy.visit(`${process.env.VITE_FRONTEND_URL}/register`);

    // Filling out the form again with an existing email
    cy.get('[name="first_name"]').type(registrationData.firstName);
    cy.get('[name="last_name"]').type(registrationData.lastName);
    cy.get('[name="email"]').type("johndoe@example.com");
    cy.get('[name="phone"]').type(registrationData.phone);
    cy.get('[name="password"]').type(registrationData.password);
    cy.get('[name="confirmPassword"]').type(registrationData.confirmPassword);

    // Submit
    cy.get("#register").click();

    // Waiting for the request and assert response
    cy.wait("@registerUserExists", { timeout: 60000 })
      .its("response.statusCode")
      .should("eq", 400);

    // Asserting that the error toast appears
    cy.get(".Toastify__toast--error")
      .should("exist")
      .and("contain", "Email already exists");
  });
});