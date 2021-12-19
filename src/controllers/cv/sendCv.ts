import { Request, Response } from "express";
import { sendMail } from "../../helpers/helpers";

export const sendCv = async (req: Request, res: Response) => {
  // const pathToAttachment = `${process.cwd()}/uploads/0c854c61dad58b5563ba7e0dc5028aea`;
  // const attachment = fs.readFileSync(pathToAttachment).toString("base64");
  //
  try {
    const file = req.file;
    const email = req?.body?.email;

    console.log(`file`, file);
    console.log(`email`, email);

    console.log(email);

    if (!file || !email) return res.sendStatus(400);

    const base64File =Buffer.from(file.buffer).toString("base64");
    await sendMail(email, base64File);
    // fs.writeFile(savePath, file.buffer, function (err: any) {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   console.log("The file was saved!");
    // });
    // console.log(`file`, req.file);
    // fs.readFile(savePath, async (_: any, file: any) => {
    //   const base64File = new Buffer(file).toString('base64');
    //   console.log(base64File);
    //   await sendMail("tranquochung6810@gmail.com", base64File);
    // });

    // await sendMail("tranquochung6810@gmail.com", savePath);
    return res.status(200).json({ status: 200, message: "success" });
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ status: 400, message: error.message });
  }
};
