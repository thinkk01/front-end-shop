import { AbilityBuilder, Ability } from "@casl/ability";
export type Subjects = string;
export type Actions = "manage" | "create" | "read" | "update" | "delete";
export type AppAbility = Ability<[Actions, Subjects]> | undefined;
export const AppAbilityClass = Ability as any;
export type ACLObj = { 
  action: Actions; 
  subject: string; 
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (permission: string[], subject: string) => {
  const { can, rules } = new AbilityBuilder(AppAbilityClass);

  if (permission.includes("ADMIN.GRANTED") || permission.length) {
    can("manage", "all");
  }

  return rules;
};

export const buildAbilityFor = (permission: string[], subject: string): AppAbility => {
  return new AppAbilityClass(defineRulesFor(permission, subject), {
    detectSubjectType: (object: { type: string }) => object!.type
  });
};

export const defaultACLObj: ACLObj = {
  action: "manage",
  subject: "all"
};

export default defineRulesFor;
