import { AnimatedTopDock } from '../shaders/animated-top-dock/AnimatedTopDock'

export function SiteHeader({ variant }: { variant?: string } = {}) {
  void variant
  return (
    <header className="site-header site-header--animated">
      <div className="site-header__dock">
        <AnimatedTopDock
          variant="modern"
          proximity={122}
          spring={0.19}
          damping={0.70}
          widthGrowth={17}
          heightGrowth={16}
          drop={3.5}
          className="dbs-top-dock"
        />
      </div>
    </header>
  )
}
