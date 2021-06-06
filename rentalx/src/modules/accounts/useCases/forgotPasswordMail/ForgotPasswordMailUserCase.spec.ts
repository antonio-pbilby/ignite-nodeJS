import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/mailProvider/inMemory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { ForgotPasswordMailUseCase } from "./ForgotPasswordMailUseCase";

let forgotPasswordMailUseCase: ForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Frogot password mailer", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();

    forgotPasswordMailUseCase = new ForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokenRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a 'forgot password' mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      name: "Roger Mullins",
      driver_license: "971534",
      email: "onvo@vek.nl",
      password: "1234",
    });

    await forgotPasswordMailUseCase.execute("onvo@vek.nl");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send email if user does not exist", async () => {
    await expect(
      forgotPasswordMailUseCase.execute("hit@us.zm")
    ).rejects.toEqual(new AppError("User does not exist!"));
  });

  it("Should be able to create an users token", async () => {
    const generateTokenMail = spyOn(usersTokenRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      name: "Benjamin Norton",
      driver_license: "430321",
      email: "kokcub@nog.tl",
      password: "1234",
    });

    await forgotPasswordMailUseCase.execute("kokcub@nog.tl");

    expect(generateTokenMail).toHaveBeenCalled();
  });
});
