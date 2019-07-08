declare interface SvgrComponent extends React.StatelessComponent<React.SVGAttributes<SVGAElement>> {}

declare module '*.svg' {
  const content: SvgrComponent;
  export default content;
}
