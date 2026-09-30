export const fadeUp = { hidden:{opacity:0,y:34}, visible:{opacity:1,y:0,transition:{duration:.7,ease:[.22,1,.36,1]}} } as const;
export const slideIn = { hidden:{opacity:0,x:-45}, visible:{opacity:1,x:0,transition:{duration:.75,ease:[.22,1,.36,1]}} } as const;
export const stagger = { visible:{transition:{staggerChildren:.12}} };
