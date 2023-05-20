import { User } from "./User.js";

export const generateUserMockup = async () => {

    const admin = User.build({
        username:'admin',
        access_token: '1000.36b9d0d1c1db7ba9344ebfa1de41a9df.2797bd65f3f264e30b300ac2e5bb14b8',
        refresh_token: '1000.8592178aebd529112ea5ef40a1bdfdfd.9d226f71cfb2eb9aed9b8cc51eb5b7eb'
    })
    return await admin.save()
}