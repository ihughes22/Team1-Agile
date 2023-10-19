import { PROJECT_STATUSES, USER_ROLES } from "../constants.js";
import * as helpers from "../helpers.js";
import { userData } from "../data/index.js";

let createdUser;
beforeAll(async () => {
  createdUser = await userData.createUser(
    "Test",
    "User",
    "Abcd@1234",
    "test@ss.com",
    USER_ROLES.ADMIN,
    { _id: 0 }
  );
});

describe("checkProjectStatus", () => {
  it("should throw an error if status is not a string", () => {
    expect(() => helpers.checkProjectStatus(123)).toThrow(
      "Error: Project Status must be a string!"
    );
  });

  it("should throw an error if status is empty", () => {
    expect(() => helpers.checkProjectStatus("")).toThrow(
      "Error: You must supply a Project Status!"
    );
  });

  it("should throw an error if status is not a valid status", () => {
    expect(() => helpers.checkProjectStatus("invalid")).toThrow(
      "Invalid Project Status"
    );
  });

  it("should return the status if valid", () => {
    expect(helpers.checkProjectStatus(PROJECT_STATUSES.CREATED)).toBe(
      PROJECT_STATUSES.CREATED
    );
  });
});

describe("canViewProject", () => {
  it("should return false if currentUser is undefined", () => {
    expect(helpers.canViewProject(undefined, {})).toBe(false);
  });

  it("should return true if currentUser is admin", () => {
    expect(
      helpers.canViewProject(
        {
          role: USER_ROLES.ADMIN,
        },
        {}
      )
    ).toBe(true);
  });

  it("should return true if currentUser is sales rep and currentUser's ID matches project's sales rep ID", () => {
    expect(
      helpers.canViewProject(
        {
          role: USER_ROLES.SALES_REP,
          _id: "123",
        },
        {
          salesRep: {
            _id: "123",
          },
        }
      )
    ).toBe(true);
  });

  it("should return false if currentUser is sales rep and currentUser's ID does not match project's sales rep ID", () => {
    expect(
      helpers.canViewProject(
        {
          role: USER_ROLES.SALES_REP,
          _id: "123",
        },
        {
          salesRep: {
            _id: "456",
          },
        }
      )
    ).toBe(false);
  });

  it("should return true if currentUser is general contractor and currentUser's ID matches project's general contractor ID", () => {
    expect(
      helpers.canViewProject(
        {
          role: USER_ROLES.GENERAL_CONTRACTOR,
          _id: "123",
        },
        {
          generalContractor: {
            _id: "123",
          },
        }
      )
    ).toBe(true);
  });

  it("should return false if currentUser is general contractor and currentUser's ID does not match project's general contractor ID", () => {
    expect(
      helpers.canViewProject(
        {
          role: USER_ROLES.GENERAL_CONTRACTOR,
          _id: "123",
        },
        {
          generalContractor: {
            _id: "456",
          },
        }
      )
    ).toBe(false);
  });

  it("should return true if currentUser is worker and currentUser's ID matches a worker's ID in project's workers array with status INSTALLATION_STARTED", () => {
    expect(
      helpers.canViewProject(
        {
          role: USER_ROLES.WORKER,
          _id: "123",
        },
        {
          status: PROJECT_STATUSES.INSTALLATION_STARTED,
          workers: [
            {
              _id: "123",
            },
          ],
        }
      )
    ).toBe(true);
  });

  it("should return false if currentUser is worker and currentUser's ID matches a worker's ID in project's workers array when status is something else", () => {
    expect(
      helpers.canViewProject(
        {
          role: USER_ROLES.WORKER,
          _id: "123",
        },
        {
          status: PROJECT_STATUSES.VALIDATING_PERMITS,
          workers: [
            {
              _id: "123",
            },
          ],
        }
      )
    ).toBe(false);
  });

  it("should return false if currentUser is worker and currentUser's ID does not match a worker's ID in project's workers array", () => {
    expect(
      helpers.canViewProject(
        {
          role: USER_ROLES.WORKER,
          _id: "123",
        },
        {
          workers: [
            {
              _id: "456",
            },
          ],
        }
      )
    ).toBe(false);
  });
});

describe("checkString", () => {
  it("should throw an error if string is not a string", () => {
    expect(() => helpers.checkString(123, "Input")).toThrow(
      "Error: Input must be a string!"
    );
  });

  it("should throw an error if string is empty", () => {
    expect(() => helpers.checkString("", "string")).toThrow(
      "Error: You must supply a string!"
    );
  });

  it("should return the string if valid", () => {
    expect(helpers.checkString("test")).toBe("test");
  });
});

describe("checkPassword", () => {
  it("should throw an error if there is no password", () => {
    expect(() => helpers.checkPassword()).toThrow(
      "You must provide a password for the user."
    );
  });

  it("should throw an error if password is not a string", () => {
    expect(() => helpers.checkPassword(123)).toThrow(
      "Password must be of type string."
    );
  });

  it("should throw an error if the password is an empty string", () => {
    expect(() => helpers.checkPassword("     ")).toThrow(
      "Password cannot be an empty string."
    );
  });

  it("should throw an error if the password has length less than 8", () => {
    expect(() => helpers.checkPassword("Abcd12@")).toThrow(
      "Password cannot be less than 8 digits."
    );
  });

  it("should throw an error if the password does not have a number", () => {
    expect(() => helpers.checkPassword("Abcdefg@")).toThrow(
      "Password does not have a number."
    );
  });

  it("should throw an error if the password does not have a special character", () => {
    expect(() => helpers.checkPassword("Abcd1234")).toThrow(
      "Password must have special characters included."
    );
  });

  it("should throw an error if the password does not have an uppercase character", () => {
    expect(() => helpers.checkPassword("abcd1234@")).toThrow(
      "Password must have upper case."
    );
  });

  it("should return the string if valid", () => {
    expect(helpers.checkPassword("Abcd1234@")).toBe("Abcd1234@");
  });
});

describe("checkId", () => {
  it("should throw an error if no id is provided", () => {
    expect(() => helpers.checkId()).toThrow(`Error: You must provide a id`);
  });

  it("should throw an error if id is not a string", () => {
    expect(() => helpers.checkId(123)).toThrow(`Error: id must be a string`);
  });

  it("should throw an error if id is empty", () => {
    expect(() => helpers.checkId("   ")).toThrow(
      `Error: id cannot be an empty string or just spaces`
    );
  });
});

describe("checkIdArray", () => {
  it("should throw an error if idArray is not an Array", () => {
    expect(() => helpers.checkIdArray(123)).toThrow("idArray is not an array");
  });

  it("should throw an error if idArray has invalid ids", () => {
    expect(() => helpers.checkIdArray(["", "  "])).toThrow(
      "Error: You must provide a id in idArray"
    );
  });
});
describe("checkEmail", () => {
  it("should throw an error if email is not in email format", () => {
    expect(() => helpers.checkEmail("solarstep")).toThrow(
      "Invalid email address!"
    );
  });

  it("should return the email is in email format", () => {
    expect(helpers.checkEmail("admin@solarstep.com")).toBe(
      "admin@solarstep.com"
    );
  });
});

describe("checkAddress", () => {
  it("should throw an error if address does not have streetAddress", () => {
    let address = {};
    address.zipCode = "07030";
    address.city = "Hoboken";
    address.state = "NJ";
    expect(() => helpers.checkAddress(address)).toThrow(
      "Error: Street Address is required"
    );
  });

  it("should throw an error if address does not have zipCode", () => {
    let address = {};
    address.streetAddress = "Somewhere";
    address.city = "Hoboken";
    address.state = "NJ";
    expect(() => helpers.checkAddress(address)).toThrow(
      "Error: Zip Code is required"
    );
  });

  it("should throw an error if address does not have city", () => {
    let address = {};
    address.streetAddress = "Somewhere";
    address.zipCode = "07030";
    address.state = "NJ";
    expect(() => helpers.checkAddress(address)).toThrow(
      "Error: City is required"
    );
  });

  it("should throw an error if address does not have state", () => {
    let address = {};
    address.streetAddress = "Somewhere";
    address.zipCode = "07030";
    address.city = "Hoboken";
    expect(() => helpers.checkAddress(address)).toThrow(
      "Error: State is required"
    );
  });

  it("should return the address if address is valid", () => {
    let address = {};
    address.streetAddress = "Somewhere";
    address.zipCode = "07030";
    address.city = "Hoboken";
    address.state = "NJ";
    expect(helpers.checkAddress(address)).toBe(address);
  });
});