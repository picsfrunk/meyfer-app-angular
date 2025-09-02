export interface MenuItem {
  title: string;
  icon: string;
  link?: string;
  children?: MenuItem[];
  disabled?: boolean;
  subMenuType?: 'categories' | 'default';
}
