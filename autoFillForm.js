const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

// Configuración del navegador
const options = new chrome.Options();
options.addArguments("--start-maximized");
options.addArguments("--disable-extensions");
options.addArguments("--disable-gpu");

// Función para completar la primera parte del formulario
const fillFormAndProceed = async (driver) => {
  try {
    // Esperar a que el botón "Next" aparezca inmediatamente después de la carga de la página
    let nextButton = await driver.wait(
      until.elementLocated(By.css("button.sc-53faf2db-1.eGbWzi")),
      5000
    );
    await nextButton.click();

    // Esperar a que el primer campo esté disponible y completar el formulario
    let nameField = await driver.wait(
      until.elementLocated(By.css("#e533baac-47fc-4c87-9557-56d40d318d23")),
      5000
    );
    await nameField.sendKeys("Max Cereceda");

    let emailField = await driver.wait(
      until.elementLocated(By.id("008fd698-c471-47c9-84ae-6c2f92c8e8aa")),
      5000
    );
    await emailField.sendKeys("cereceda1991@gmail.com");

    let radioButton = await driver.wait(
      until.elementLocated(
        By.css("#choice_ee1eae35-8a98-4410-b986-ffd162a8af35")
      ),
      5000
    );
    await radioButton.click();

    // Esperar a que el botón "Next" esté disponible y hacer clic en él
    let nextButton2 = await driver.wait(
      until.elementLocated(By.css('button[aria-label="Next"]')),
      5000
    );
    await nextButton2.click();

    // Esperar a que la navegación a la siguiente página se complete
    await driver.wait(
      until.elementLocated(By.id("02c193c8-ac8c-467f-a4fd-c59c6ad668b1")),
      5000
    );

    console.log("Primera parte del formulario completada.");
  } catch (error) {
    console.error("Error al completar la primera parte del formulario:", error);
  }
};

// Función para completar la segunda parte del formulario
const fillTeamMateAndRatings = async (driver) => {
  try {
    // Rellenar el campo "Nombre y apellido del compañero de equipo"
    let teamMateField = await driver.wait(
      until.elementIsVisible(
        driver.findElement(By.id("02c193c8-ac8c-467f-a4fd-c59c6ad668b1"))
      ),
      5000
    );
    await teamMateField.sendKeys("Pedro García");

    // Seleccionar las últimas estrellas (valor 10) en todos los campos de rating
    const ratingIds = [
      "#star_9c187247-25ba-4dfb-bf81-c03e6223c9fa_10",
      "#star_263ff65f-82bc-46ba-b215-13f9ba36dd2a_10",
      "#star_fa121538-e701-4d80-8669-6a024e2090b9_10",
      "#star_a0f6f22e-80f0-43f9-a6a9-134388866e09_10",
      "#star_9d126f97-9347-49b7-957e-548482b69520_10",
      "#star_c560a73a-e891-4d67-8a5f-c2772e30884a_10",
      "#star_0070daea-21e5-4a8f-a27c-469127b717d4_10",
      "#star_09b3e017-0eff-4061-9951-91433c4e07bf_10",
      "#star_ef6386f5-d539-4e52-ae2e-b7cf24fe0735_10",
      "#star_0edd73fe-8853-42db-9b84-dba46e821fce_10",
      "#star_ab0e0d06-1f55-4a82-a6d2-9e57d3899675_10",
      "#star_db8ba58f-a4af-4a3e-bde6-ce4e74937d11_10",
      "#star_a60d77f9-ee1c-4d3c-8a82-e9db3b586ebc_10",
    ];

    for (const ratingId of ratingIds) {
      let ratingElement = await driver.wait(
        until.elementLocated(By.css(ratingId)),
        5000
      );
      await ratingElement.click();
    }

    console.log("Formulario de calificaciones completado.");
  } catch (error) {
    console.error("Error al completar las calificaciones:", error);
  }
};

// Ejecutar las funciones
(async () => {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Navegar a la página del formulario
    await driver.get("https://tally.so/r/wLWyQJ");

    // Paso 1: Llenar nombre, apellido, correo y hacer clic en "Next"
    await fillFormAndProceed(driver);

    // Paso 2: Llenar el nombre del compañero y seleccionar las estrellas
    await fillTeamMateAndRatings(driver);
  } catch (error) {
    console.error("Error en el proceso de automatización:", error);
  }

  // No se cierra el navegador para que puedas seguir trabajando
  // await driver.quit();
})();
