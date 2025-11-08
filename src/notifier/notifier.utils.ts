import { IMessageParams } from "./notifier.types";

export const formatMessage = ({
  title,
  price,
  date,
  productUrl,
}: IMessageParams) => {
  return `
    <table
      role="presentation"
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
      style="background-color: #f5f7fb"
    >
      <tr>
        <td align="center">
          <!-- Container -->
          <table
            role="presentation"
            cellpadding="0"
            cellspacing="0"
            border="0"
            width="600"
            style="width: 600px; max-width: 100%"
          >
            <!-- Header -->
            <tr>
              <td
                align="left"
                bgcolor="#3B82F6"
                style="
                  display: grid;
                  align-items: center;
                  grid-template-columns: 50px 1fr;
                  padding: 16px 20px;
                  background-color: #3b82f6;
                "
              >
                <img
                  src="https://products-tracker-assets.s3.us-east-1.amazonaws.com/logo.svg"
                  alt="AWS Products Tracker"
                  width="50"
                  height="50"
                  style="
                    display: block;
                    border: 0;
                    outline: none;
                    text-decoration: none;
                  "
                />
                <p style="color: white; font-size: x-large; text-align: center">
                  AWS Products Tracker
                </p>
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
                  Alerta de bajada de precio
                </h1>
                <p style="margin: 0 0 6px; font-size: 14px; line-height: 1.6">
                  <strong>Producto:</strong> ${title}
                </p>
                <p style="margin: 0 0 6px; font-size: 14px; line-height: 1.6">
                  <strong>Precio:</strong> ${price}
                </p>
                <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.6">
                  <strong>Fecha:</strong> ${date}
                </p>

                <table
                  role="presentation"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
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
                        Ver Producto
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
                Recibes este aviso porque sigues este producto en AWS Products
                Tracker. Gestiona tus alertas desde tu cuenta.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
};
