import { IMessageParams } from "./notifier.types";

export const formatMessage = ({
  title,
  price,
  date,
  productUrl,
}: IMessageParams) => {
  return `
    <h1>Alerta de bajada de precio</h1>
    <p><strong>Producto:</strong> ${title}</p>
    <p><strong>Precio:</strong> ${price}</p>
    <p><strong>Fecha:</strong> ${date}</p></br>
    <button style="background-color: hsl(213 94% 68%); border: none; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 8px;">
      <a href="${productUrl}" style="color: white; text-decoration: none;">Ver Producto</a>
    </button>
  `;
};
