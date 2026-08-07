    import { validateTaskTitle } from "../../src/utils/validateTask";
        describe("validateTaskTitle", () => {

  describe("Cuando el titulo es valido", () => {

    it("debe aceptar un titulo con exactamente 3 caracteres", () => {
      const title = "ABC";
      const result = validateTaskTitle(title);
      expect(result).toBe(null);
    });

    it("debe aceptar un titulo con espacios al inicio y al final", () => {
      const title = "   Comprar leche   ";
      const result = validateTaskTitle(title);
      expect(result).toBe(null);
    });

    it("debe aceptar un titulo que contiene numeros", () => {
      const title = "Comprar leche 2026";
      const result = validateTaskTitle(title);
      expect(result).toBe(null);
    });

  });

  describe("Cuando el titulo es invalido", () => {

    it("debe retornar un mensaje cuando el titulo esta vacio", () => {
      const title = "";
      const result = validateTaskTitle(title);
      expect(result).toBe("El título es obligatorio");
    });

    it("debe retornar un mensaje cuando el titulo solo contiene espacios", () => {
      const title = "     ";
      const result = validateTaskTitle(title);
      expect(result).toBe("El título es obligatorio");
    });

    it("debe retornar un mensaje cuando el titulo supera los 100 caracteres", () => {
      const title = "A".repeat(101);
      const result = validateTaskTitle(title);
      expect(result).toBe("El título no puede exceder los 100 caracteres");
    });

  });

});