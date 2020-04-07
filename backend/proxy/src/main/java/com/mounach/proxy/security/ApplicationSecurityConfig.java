package com.mounach.proxy.security;

import com.mounach.proxy.repository.UserRepository;
import com.mounach.proxy.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.HttpMethod;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@EnableGlobalMethodSecurity(prePostEnabled = true)
@Configuration
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
@EnableWebSecurity
public class ApplicationSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {

        auth.userDetailsService(userDetailsService)
                .passwordEncoder(getPasswordEncoder());
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint())
                .and()
                .cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()).and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET,"/cinema-service/cinema")
                .permitAll()
                .antMatchers(HttpMethod.GET,"/cinema-service/cinema/{id}")
                .permitAll()
                .antMatchers(HttpMethod.GET,"/cinema-service/city")
                .permitAll()
                .antMatchers(HttpMethod.GET,"/cinema-service/city/{id}")
                .permitAll()
                .antMatchers(HttpMethod.GET,"/cinema-service/cinema/{id}/theaters")
                .permitAll()
                .antMatchers(HttpMethod.GET,"/cinema-service/cinema/{id}/sessions")
                .permitAll()
                .antMatchers(HttpMethod.GET,"/cinema-service/session/{id}")
                .permitAll()
                .antMatchers(HttpMethod.GET,"/cinema-service/session/{id}/tickets")
                .permitAll()
                .antMatchers(HttpMethod.POST,"/cinema-service/ticket")
                .permitAll()
                .antMatchers(HttpMethod.POST,"/qrcode-service/qrcode")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .formLogin()
                .loginProcessingUrl("/login")
                .successHandler(successHandler())
                .failureHandler(failureHandler())
                .and()
                .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler())
                .authenticationEntryPoint(authenticationEntryPoint())
                .and()
                .logout()
                .logoutUrl("/logout")
                .deleteCookies("JSESSIONID");
    }

    private PasswordEncoder getPasswordEncoder() {
        return new PasswordEncoder() {
            @Override
            public String encode(CharSequence charSequence) {
                return charSequence.toString();
            }

            @Override
            public boolean matches(CharSequence charSequence, String s) {
                return passwordEncoder().matches(charSequence, s);
            }
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(new ImmutableObservableList("http://localhost:4200"));
        configuration.setAllowedMethods(new ImmutableObservableList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(new ImmutableObservableList("Authorization", "Set-Cookie", "Cache-Control", "Content-Type"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }*/

    private AuthenticationSuccessHandler successHandler() {
        return new AuthenticationSuccessHandler() {

            @Override
            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                response.getWriter().append("{" +
                        "\"status\": \"success\"" +
                        "}");
                response.setStatus(200);
            }
        };
    }

    private AuthenticationEntryPoint authenticationEntryPoint() {
        return new AuthenticationEntryPoint() {
            @Override
            public void commence(HttpServletRequest request, HttpServletResponse response, org.springframework.security.core.AuthenticationException authException) throws IOException, ServletException {
                response.getWriter().append("{" +
                        "\"status\": \"Not authenticated\"" +
                        "}");
                response.setStatus(401);
            }
        };
    }

    private AuthenticationFailureHandler failureHandler() {
        return new AuthenticationFailureHandler() {

            @Override
            public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
                response.getWriter().append("{" +
                        "\"status\": \"Authentication failure\"" +
                        "}");
                response.setStatus(401);
            }
        };
    }

    private AccessDeniedHandler accessDeniedHandler() {
        return new AccessDeniedHandler() {

            @Override
            public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
                response.getWriter().append("{" +
                        "\"status\": \"Access denied\"" +
                        "}");
                response.setStatus(403);
            }
        };
    }

}
