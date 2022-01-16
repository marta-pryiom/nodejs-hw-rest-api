import path from 'path'
import fs from 'fs/promises'
import Users from '../../repository/user'

class LocalStorage {
  constructor(file, user) {
    this.userId = user.id
    this.filename = file.filename
    this.filePath = file.path
    this.folderAvatars = process.env.FOLDER_FOR_AVATARS
  }

  async save() {
    // Папка де фізично лежить ава
    const destination = path.join(this.folderAvatars, this.userId)

    // Створюємо,якщо такої папки немає
    await fs.mkdir(destination, { recursive: true })

    // Переносимо файл з папки UPLOAD_DIR в папку destination
    await fs.rename(this.filePath, path.join(destination, this.filename)) // avatars/userId/filename

    // Створюємо шлях для базы данных, так как фізично шлях до файлу не співпадає API
    const avatarUrl = path.normalize(path.join(this.userId, this.filename)) // userId/filename

    // Зберігаємо новий шлях до файла у користувача
    await Users.updateAvatar(this.userId, avatarUrl)
    return avatarUrl
  }
}
export default LocalStorage
