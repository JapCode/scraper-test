const { UserModel } = require('../model/userSchema');

const editUserData = async (userId, updateData) => {
  try {
    const update = {};
    if (updateData.username) update.username = updateData.username;
    if (updateData.email) update.email = updateData.email;
    if (updateData.password) update.password = updateData.password;

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: update },
      { new: true },
    );

    if (!updatedUser) {
      const error = new Error(`User not found with id: ${userId}`);
      error.name = 'userNotFound';
      throw error;
    }
    return updatedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = { editUserData };
