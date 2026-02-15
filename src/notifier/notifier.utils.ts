import { IMessageParams } from "./notifier.types";
import i18n from "../i18n/i18n";

export const formatMessage = ({
  title,
  price,
  date,
  productUrl,
  imageUrl,
}: IMessageParams) => {
  const appName = `${i18n.t("EMAIL_APP_TITLE")}`;

  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body
    style="
      background-color: #f5f7fb;
      font-family: ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji',
        'Segoe UI Emoji', Segoe UI Symbol, 'Noto Color Emoji';
    "
  >
    <table
      role="presentation"
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
    >
      <tr>
  <td bgcolor="#ffffff" style="background-color:#ffffff; padding:20px;">
    <a href="https://aws-products-tracker.netlify.app/"
       target="_blank"
       style="text-decoration:none; color:#1A212D; display:block;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td width="80" valign="middle" style="padding:0; margin:0;">
            <img
              src="https://products-tracker-assets.s3.us-east-1.amazonaws.com/pricio.jpeg"
              alt="${appName}"
              width="80"
              height="80"
              style="display:block; border:0; outline:none; text-decoration:none;"
            />
          </td>
          <td valign="middle" style="padding-left:12px;">
            <h1 style="margin:0; font-size:24px; line-height:1.2; color:#1A212D; font-family: Arial, Helvetica, sans-serif;">
             ${appName}
            </h1>
            <p style="margin:0; font-size:12px; line-height:16px; color:#6B7280; font-family: Arial, Helvetica, sans-serif;">
              ${i18n.t("EMAIL_APP_SUBTITLE")}
            </p>
          </td>
        </tr>
      </table>
    </a>
  </td>
</tr>


            <!-- Body -->
            <tr>
              <td
                align="left"
                bgcolor="#FFFFFF"
                style="
                  background-color: #ffffff;
                  padding: 24px 20px;
                  font-family: Arial, Helvetica, sans-serif;
                  color: #111827;
                "
              >
                <h1
                  style="
                    margin: 0 0 12px;
                    font-size: 22px;
                    line-height: 1.3;
                    color: #111827;
                  "
                >
              ${i18n.t("EMAIL_CONTENT_TITLE")}

                </h1>
                <p style="margin: 0 0 6px; font-size: 14px; line-height: 1.6">
                  <strong> ${i18n.t("EMAIL_PRODUCT_TITLE")}:</strong> ${title}
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; line-height: 1.6">
                  <strong> ${i18n.t("EMAIL_PRODUCT_PRICE")}:</strong> ${price}
                </p>
                <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.6">
                  <strong> ${i18n.t("EMAIL_PRODUCT_DATE")}:</strong> ${date}
                </p>

                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  align="center"
                >
                  <tr>
                    <td>
                      <img
                        src="${imageUrl}"
                        alt="${i18n.t("EMAIL_ALT_TEXT_PRODUCT_IMAGE")}"
                        style="max-width: 100%; height: 300px"
                      />
                    </td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  align="center"
                >
                  <tr>
                    <td
                      bgcolor="#3B82F6"
                      style="border-radius: 8px; background-color: #3b82f6"
                    >
                      <a
                        href="${productUrl}"
                        target="_blank"
                        style="
                          display: inline-block;
                          padding: 12px 24px;
                          font-family: Arial, Helvetica, sans-serif;
                          font-size: 16px;
                          line-height: 16px;
                          color: #ffffff;
                          text-decoration: none;
                          border-radius: 8px;
                        "
                      >
                        ${i18n.t("EMAIL_CTA_BUTTON")}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="
                  padding: 16px 20px;
                  font-family: Arial, Helvetica, sans-serif;
                  font-size: 12px;
                  color: #6b7280;
                "
              >
            ${i18n.t("EMAIL_FOOTER", { appName })}
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

  `;
};
