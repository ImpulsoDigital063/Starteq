// Fundo instrumentado fixo · profundidade sem WebGL (Camada 1 do estudo).
// glow ambiente + grid técnico ficam atrás do conteúdo; o grão fica por cima,
// sutil, matando o "chapado" do preto liso em qualquer superfície.
export function SiteBackground() {
  return (
    <>
      <div className="site-glow" aria-hidden="true" />
      <div className="site-grid" aria-hidden="true" />
      <div className="site-noise" aria-hidden="true" />
    </>
  );
}
