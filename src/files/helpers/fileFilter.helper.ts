

export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback:Function )=> {
    console.log({file});

    const allowedFiles = ['pdf', 'png', 'jpg', 'jpeg'];

    if (!file) return callback(new Error('File is empty'), false);

    // Verify if the file is allowed or not
    const typeFile = file.mimetype.split('/')[1].toLowerCase();

    return (allowedFiles.includes(typeFile)) ? callback(null, true) : callback(null, false)

}
