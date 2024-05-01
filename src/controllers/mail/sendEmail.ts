import { RequestWithUser } from "../../types";
import EmailService from "./emailService";
import { Response } from "express";

async function sendEmail(req: RequestWithUser, res: Response) {
  if (
    !req.body.email ||
    !req.body.pagesize ||
    !req.body.color ||
    !req.body.printtype ||
    !req.body.priceperpage ||
    !req.body.totalpages ||
    !req.body.paymentid
  ) {
    // return res.send(400);
  }

  try {
    const attachments: Object[] = [];
    if (req.body.filelink && req.body.filelink.length > 0) {
      attachments.push({
        filelink: "",
        path: req.body.filelink,
        contentType: "application/pdf",
      });
    }

    const mailOptions = {
      from: "myprakhar96@gmail.com",
      to: req.body.email,
      subject: "PDF Attachment",
      html: `
              <div style="font-family: Arial, sans-serif;">
                <h1 style="color: #333333;">Please find attached PDF</h1>
                <div style="margin-bottom: 20px;">
                  <h2 style="color: #007bff;">DETAILS:</h2>
                  <ul>
                    <li><strong>Page Size:</strong> ${req.body.pagesize}</li>
                    <li><strong>Color:</strong> ${req.body.color}</li>
                    <li><strong>Print Type:</strong> ${req.body.printtype}</li>
                    <li><strong>Number of Pages:</strong> ${
                      req.body.totalpages
                    }</li>
                  </ul>
                </div>
                <div>
                  <h2 style="color: #007bff;">PRICING:</h2>
                  <ul>
                    <li><strong>Price per Page:</strong> Rs. ${
                      req.body.priceperpage
                    }</li>
                    <li><strong>Total Cost:</strong> ${
                      req.body.totalpages
                    } * Rs. ${req.body.priceperpage} = ${
                      req.body.totalpages * req.body.priceperpage
                    }</li>
                  </ul>
                </div>
              </div>`,
      attachments: attachments,
    };

    const emailServiceCallResp = await EmailService.sendEmail(mailOptions);
    if (emailServiceCallResp === 0) {
      return res.json({
        success: false,
        msg: "filelink must be a valid link!",
      });
    }
    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false });
  }
}

export default sendEmail;
