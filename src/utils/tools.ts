export function getHost(type: string) {
  return (window as any).apiHostSetting ? (window as any).apiHostSetting[type] : process.env[type];
}
