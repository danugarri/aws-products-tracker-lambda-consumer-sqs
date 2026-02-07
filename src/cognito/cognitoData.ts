import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
  ListUsersCommandInput,
  ListUsersCommandOutput,
  UserType,
} from "@aws-sdk/client-cognito-identity-provider";

import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

// Load environment variables safely
const REGION = process.env.REGION!;
// const USER_POOL_ID = process.env.USER_POOL_ID!;

const client = new CognitoIdentityProviderClient({
  region: REGION,
});

export async function listAllUsers(userPoolId: string): Promise<UserType[]> {
  try {
    console.log({ userPoolId });
    let paginationToken: string | undefined = undefined;
    const allUsers: UserType[] = [];

    do {
      const input: ListUsersCommandInput = {
        UserPoolId: userPoolId,
        PaginationToken: paginationToken,
        Limit: 60,
      };

      const command = new ListUsersCommand(input);
      const response: ListUsersCommandOutput = await client.send(command);

      if (response.Users) {
        allUsers.push(...response.Users);
      }

      paginationToken = response.PaginationToken;
    } while (paginationToken);
    console.log({ allUsers }, "Users retrieved from Cognito");
    return allUsers;
  } catch (error) {
    console.error("Error listing users from Cognito:", error);
    throw error;
  }
}

// (async () => {
//   const users = await listAllUsers(USER_POOL_ID);
//   console.log({ users });
//   users.map((property) => {
//     console.log(property.Attributes);
//   });
// })();
