const getHomeRoute = (role:string) =>{
    if (role === "client") return "/acl";
    else return "/dashboards/analytics";
};
export default getHomeRoute;